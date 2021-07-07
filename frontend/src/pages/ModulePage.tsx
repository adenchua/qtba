import React, { useEffect, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

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

const useStyles = makeStyles((theme: Theme) => ({
  mb2: {
    marginBottom: theme.spacing(2),
  },
  container: {
    marginLeft: DRAWER_WIDTH,
  },
  inputWrapper: {
    border: `1px solid ${theme.palette.divider}`,
    height: 36,
    padding: "0px 8px",
    caretColor: theme.palette.primary.main,
  },
}));

const ModulePage = (): JSX.Element => {
  const { moduleSlug } = useParams<{ moduleSlug: string | undefined }>();
  const [module, setModule] = useState<ModuleInterface | null>(null);
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [showVoteCount, setShowVoteCount] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    const retrieveModuleFromSlug = async (): Promise<void> => {
      if (!moduleSlug) {
        return;
      }

      try {
        const response = await getModuleBySlug(moduleSlug);
        const { questions: questionIds } = response;
        retrieveQuestionsFromModule(questionIds);
        setModule(response);
      } catch (error) {
        // do nothing
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
  }, [moduleSlug]);

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

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toolbar />
      <Container className={classes.container}>
        <Typography variant='h4' color='textSecondary'>
          Questions to Be Answered
        </Typography>
        <Box mt={4}>
          <Grid container justify='flex-end' alignItems='center' className={classes.mb2} spacing={1}>
            <Grid item>
              <Paper elevation={0} className={classes.inputWrapper}>
                <InputBase
                  placeholder='search'
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
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
            showVoteCount={showVoteCount}
          />
        </Box>
      </Container>
    </>
  );
};

export default ModulePage;
