import React, { useState, useCallback } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutline";
import CheckedCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import QuestionMeatballsMenu from "./QuestionMeatballsMenu";
import QuestionInterface from "../types/QuestionInterface";

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
    padding: "8px",
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
    padding: "8px",
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
  questions: QuestionInterface[];
  onIncrementVoteHandler: (questionId: string) => Promise<void>;
  onStrikethroughHandler: (questionId: string) => Promise<void>;
  onUnStrikethroughHandler: (questionId: string) => Promise<void>;
  showVoteCount: boolean;
}

const QTBATable = (props: QTBATableProps): JSX.Element => {
  const { questions, onIncrementVoteHandler, onStrikethroughHandler, onUnStrikethroughHandler, showVoteCount } = props;
  const classes = useStyles();
  const [votedQuestionIds, setVotedQuestionIds] = useState<string[]>([]);

  const handleVoteQuestion = async (questionId: string): Promise<void> => {
    if (votedQuestionIds.includes(questionId)) {
      return; // already in vote
    }
    await onIncrementVoteHandler(questionId);
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

  const renderTableRow = (question: QuestionInterface, questionIndex: number): JSX.Element => {
    const { title, _id: questionId, voteCount, isStrikethrough } = question;
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
            <Typography variant='body2' color='textSecondary' className={isStrikethrough ? classes.strikethrough : ""}>
              {voteCount}
            </Typography>
          )}
          {!showVoteCount && !votedQuestionIds.includes(questionId) && (
            <IconButton size='small' onClick={() => handleVoteQuestion(questionId)}>
              <CheckCircleIcon fontSize='small' color='disabled' />
            </IconButton>
          )}
          {!showVoteCount && votedQuestionIds.includes(questionId) && (
            <IconButton size='small' onClick={() => handleUnvoteQuestion(questionId)}>
              <CheckedCircleIcon fontSize='small' color='primary' />
            </IconButton>
          )}
        </td>
        <td className={classes.tableBodyRowColumn}>
          <QuestionMeatballsMenu
            onStrikethroughHandler={onStrikethroughHandler}
            onUnStrikethroughHandler={onUnStrikethroughHandler}
            question={question}
          />
        </td>
      </tr>
    );
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
