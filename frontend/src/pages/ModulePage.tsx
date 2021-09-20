import React, { useEffect, useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useParams, useHistory } from "react-router-dom";

import PageLayoutWrapper from "./PageLayoutWrapper";
import QTBACreationButton from "../components/QTBACreationButton";
import TableKebabMenu from "../components/TableKebabMenu";
import QTBATable from "../components/QTBATable";
import getModuleBySlug from "../api/getModuleBySlug";
import ModuleInterface from "../types/ModuleInterface";
import getModuleQuestions from "../api/getModuleQuestions";
import resetModuleQuestionVotes from "../api/resetModuleQuestionVotes";
import { QuestionsContext } from "../components/QuestionsContextProvider";

const ModulePage = (): JSX.Element => {
  const { questions, setQuestions, resetAllQuestionVotes } = useContext(QuestionsContext);
  const { moduleSlug } = useParams<{ moduleSlug: string | undefined }>();
  const [module, setModule] = useState<ModuleInterface | null>(null);
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
  }, [moduleSlug, history, setQuestions]);

  const handleToggleShowVoteCount = (newState: boolean): void => {
    setShowVoteCount(newState);
  };

  const handleResetAllQuestionVotes = async (): Promise<void> => {
    if (!module) {
      return;
    }
    const { _id: moduleId } = module;
    try {
      await resetModuleQuestionVotes(moduleId);
      resetAllQuestionVotes();
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
        <QTBACreationButton module={module} />
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
          <QTBACreationButton module={module} />
        </Grid>
        <Grid item>
          <TableKebabMenu
            onToggleShowVoteCount={handleToggleShowVoteCount}
            showVoteCount={showVoteCount}
            onResetAllVotesHandler={handleResetAllQuestionVotes}
          />
        </Grid>
      </Grid>
      <QTBATable searchFilter={searchFilter} showVoteCount={showVoteCount} />
    </Box>
  );

  return (
    <PageLayoutWrapper>
      <Typography variant='h5'>{`# ${module?.title}`}</Typography>
      {!isLoading && questions.length === 0 && renderNoQuestionsContent()}
      {!isLoading && questions.length !== 0 && renderTableWithHeader()}
    </PageLayoutWrapper>
  );
};

export default ModulePage;
