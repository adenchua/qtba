import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useParams, useHistory } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QTBACreationButton from "../components/QTBACreationButton";
import TableKebabMenu from "../components/TableKebabMenu";
import QTBATable from "../components/QTBATable";
import { DRAWER_WIDTH } from "../utils/constants";
import getModuleBySlug from "../api/getModuleBySlug";
import ModuleInterface from "../types/ModuleInterface";
import QuestionInterface from "../types/QuestionInterface";
import getModuleQuestions from "../api/getModuleQuestions";
import addQuestionToModule from "../api/addQuestionToModule";
import incrementQuestionVote from "../api/incrementQuestionVote";
import strikethroughQuestion from "../api/strikethroughQuestion";
import unStrikethroughQuestion from "../api/unStrikethroughQuestion";
import updateQuestion from "../api/updateQuestion";
import resetModuleQuestionVotes from "../api/resetModuleQuestionVotes";
import deleteQuestion from "../api/deleteQuestion";

const ModulePage = (): JSX.Element => {
  const { moduleSlug } = useParams<{ moduleSlug: string | undefined }>();
  const [module, setModule] = useState<ModuleInterface | null>(null);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [showVoteCount, setShowVoteCount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const retrieveModuleFromSlug = async (): Promise<void> => {
      if (!moduleSlug) {
        return;
      }

      try {
        const response = await getModuleBySlug(moduleSlug);
        const { questions: questionIds } = response;
        await retrieveQuestionsFromModule(questionIds);
        setModule(response);
        setIsLoading(false);
      } catch (error) {
        history.push("/error-page");
      }
    };

    const retrieveQuestionsFromModule = async (questionIds: string[]): Promise<void> => {
      try {
        const response = await getModuleQuestions(questionIds);
        setQuestions(response);
      } catch (error) {
        // do nothing
      }
    };

    retrieveModuleFromSlug();
  }, [moduleSlug, history]);

  const handleAddQuestion = async (title: string): Promise<void> => {
    if (!module) {
      return;
    }

    try {
      const { _id: moduleId } = module;
      const newQuestion = await addQuestionToModule(title, moduleId);
      setQuestions((prevState) => [...prevState, newQuestion]);
    } catch (error) {
      // do nothing
    }
  };

  const handleIncrementVote = async (questionId: string): Promise<void> => {
    try {
      const updatedQuestion = await incrementQuestionVote(questionId);
      const { _id: updatedQuestionId, voteCount: updatedQuestionVoteCount } = updatedQuestion;
      setQuestions((prevState) =>
        prevState.map((question) => {
          if (question._id === updatedQuestionId) {
            question.voteCount = updatedQuestionVoteCount;
          }
          return question;
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  const handleStikethroughQuestion = async (questionId: string): Promise<void> => {
    try {
      await strikethroughQuestion(questionId);
      setQuestions((prevState) =>
        prevState.map((question) => {
          if (question._id === questionId) {
            question.isStrikethrough = true;
          }
          return question;
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  const handleUnStikethroughQuestion = async (questionId: string): Promise<void> => {
    try {
      await unStrikethroughQuestion(questionId);
      setQuestions((prevState) =>
        prevState.map((question) => {
          if (question._id === questionId) {
            question.isStrikethrough = false;
          }
          return question;
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  const handleToggleShowVoteCount = (newState: boolean): void => {
    setShowVoteCount(newState);
  };

  const handleEditQuestion = async (updatedQuestionTitle: string, questionId: string): Promise<void> => {
    try {
      await updateQuestion(updatedQuestionTitle, questionId);
      setQuestions((prevState) =>
        prevState.map((question) => {
          if (question._id === questionId) {
            question.title = updatedQuestionTitle;
          }
          return question;
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  const handleResetAllQuestionVotes = async (): Promise<void> => {
    if (!module) {
      return;
    }
    const { _id: moduleId } = module;
    try {
      await resetModuleQuestionVotes(moduleId);
      setQuestions((prevState) =>
        prevState.map((question) => {
          question.voteCount = 0;
          return question;
        })
      );
    } catch (error) {
      // do nothing
    }
  };

  const handleDeleteQuestion = async (questionId: string): Promise<void> => {
    try {
      await deleteQuestion(questionId);
      const filteredQuestions = questions.filter((question) => question._id !== questionId);
      setQuestions(filteredQuestions);
    } catch (error) {
      // do nothing
    }
  };

  const renderNoQuestionsContent = (): JSX.Element => (
    <Box mt={4} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <img src='/assets/add_question.svg' alt='add question' height='380px' width='380px' />
      <Typography variant='h4' gutterBottom>
        Let's get started!
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        Start with a list of questions from the people that will be using it.
      </Typography>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        Think about the how, where, when, who, what and why.
      </Typography>
      <Box mt={1}>
        <QTBACreationButton onAddQuestionHandler={handleAddQuestion} />
      </Box>
    </Box>
  );

  const renderTableWithHeader = (): JSX.Element => (
    <Box mt={4}>
      <Grid container justifyContent='flex-end' alignItems='center' mb={2} spacing='8px'>
        <Grid item>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              height: "36px",
              padding: "0px 8px",
              caretColor: "primary.main",
            }}
          >
            <InputBase placeholder='search' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
          </Paper>
        </Grid>
        <Grid item>
          <QTBACreationButton onAddQuestionHandler={handleAddQuestion} />
        </Grid>
        <Grid item>
          <TableKebabMenu
            onToggleShowVoteCount={handleToggleShowVoteCount}
            showVoteCount={showVoteCount}
            onResetAllVotesHandler={handleResetAllQuestionVotes}
          />
        </Grid>
      </Grid>
      <QTBATable
        searchFilter={searchFilter}
        questions={questions}
        onIncrementVoteHandler={handleIncrementVote}
        onStrikethroughHandler={handleStikethroughQuestion}
        onUnStrikethroughHandler={handleUnStikethroughQuestion}
        onEditQuestionHandler={handleEditQuestion}
        onDeleteQuestionHandler={handleDeleteQuestion}
        showVoteCount={showVoteCount}
      />
    </Box>
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container sx={{ marginLeft: DRAWER_WIDTH }}>
        <Typography variant='h5'>{`# ${module?.title}`}</Typography>
        {!isLoading && questions.length === 0 && renderNoQuestionsContent()}
        {!isLoading && questions.length !== 0 && renderTableWithHeader()}
      </Container>
    </>
  );
};

export default ModulePage;
