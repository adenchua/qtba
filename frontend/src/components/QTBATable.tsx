import React, { useState, useCallback, useContext } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import CheckedCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import QuestionMeatballsMenu from "./QuestionMeatballsMenu";
import QuestionInterface from "../types/QuestionInterface";
import { QuestionsContext } from "./QuestionsContextProvider";
import incrementQuestionVote from "../api/incrementQuestionVote";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "inline-block",
    minWidth: "100%",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "#F6F6F6",
  },
  tableHeaderRow: {
    padding: "8px 8px 8px 16px",
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  tableHeaderText: {
    textTransform: "uppercase",
    color: "#A0A0A0",
    fontWeight: "bold",
  },
  tableBodyRow: {
    background: "#FFF",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  tableBodyRowColumn: {
    padding: "8px 8px 8px 16px",
  },
  strikethrough: {
    textDecoration: "line-through",
    color: "lightgrey",
    "&:hover": {
      color: "unset",
    },
  },
}));

interface QTBATableProps {
  showVoteCount: boolean;
  searchFilter: string;
}

const QTBATable = (props: QTBATableProps): JSX.Element => {
  const { showVoteCount, searchFilter } = props;
  const { questions, editQuestion } = useContext(QuestionsContext);
  const classes = useStyles();
  const [votedQuestionIds, setVotedQuestionIds] = useState<string[]>([]);

  const handleVoteQuestion = async (questionId: string): Promise<void> => {
    if (votedQuestionIds.includes(questionId)) {
      return; // already in vote
    }
    const updatedQuestion = await incrementQuestionVote(questionId);
    editQuestion(updatedQuestion);
    setVotedQuestionIds((prevState) => [...prevState, questionId]);
  };

  const handleUnvoteQuestion = (questionId: string): void => {
    if (!votedQuestionIds.includes(questionId)) {
      return;
    }

    const updatedQuestionIndexes = votedQuestionIds.filter((questionIdInArray) => questionIdInArray !== questionId);
    setVotedQuestionIds(updatedQuestionIndexes);
  };

  const renderTableHeader = useCallback((): JSX.Element => {
    return (
      <thead>
        <tr className={classes.tableHeader}>
          <th className={classes.tableHeaderRow}>
            <Typography align='left' className={classes.tableHeaderText} variant='body2'>
              #
            </Typography>
          </th>
          <th className={classes.tableHeaderRow}>
            <Typography align='left' className={classes.tableHeaderText} variant='body2'>
              Question
            </Typography>
          </th>
          <th className={classes.tableHeaderRow}>
            <Typography align='left' className={classes.tableHeaderText} variant='body2'>
              Vote
            </Typography>
          </th>
          <th className={classes.tableHeaderRow}></th>
        </tr>
      </thead>
    );
  }, [classes.tableHeader, classes.tableHeaderRow, classes.tableHeaderText]);

  const renderTableRow = (question: QuestionInterface, questionIndex: number): JSX.Element | null => {
    const { title, _id: questionId, voteCount, isStrikethrough } = question;
    if (title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return (
        <tr className={classes.tableBodyRow} key={questionId}>
          <td className={classes.tableBodyRowColumn}>
            <Typography variant='body2' color='textSecondary'>
              {questionIndex}
            </Typography>
          </td>
          <td className={classes.tableBodyRowColumn}>
            <Typography variant='body2' color='textSecondary' className={isStrikethrough ? classes.strikethrough : ""}>
              {title}
            </Typography>
          </td>
          <td className={classes.tableBodyRowColumn}>
            {showVoteCount && (
              <Typography
                variant='body2'
                color='textSecondary'
                className={isStrikethrough ? classes.strikethrough : ""}
              >
                {voteCount}
              </Typography>
            )}
            {!isStrikethrough && !showVoteCount && !votedQuestionIds.includes(questionId) && (
              <IconButton size='small' onClick={() => handleVoteQuestion(questionId)} disabled={isStrikethrough}>
                <CheckCircleIcon fontSize='small' />
              </IconButton>
            )}
            {!isStrikethrough && !showVoteCount && votedQuestionIds.includes(questionId) && (
              <IconButton size='small' onClick={() => handleUnvoteQuestion(questionId)}>
                <CheckedCircleIcon fontSize='small' color='primary' />
              </IconButton>
            )}
          </td>
          <td className={classes.tableBodyRowColumn}>
            <QuestionMeatballsMenu question={question} />
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <table className={classes.table} cellSpacing={0} cellPadding={0}>
        {renderTableHeader()}
        <tbody>
          {questions.map((qtba, index) => {
            return renderTableRow(qtba, index + 1);
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QTBATable;
