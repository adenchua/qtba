import React, { useState, useCallback } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutline";
import CheckedCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import QuestionMeatballsMenu from "./QuestionMeatballsMenu";

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
}));

const QUESTIONS_BANK = [
  {
    question: "How do we find out more about you?",
    questionIndex: 1,
    likes: 46,
    isStrikeThrough: true,
  },
  {
    question:
      "How can a customer service team recognize these customer needs and effectively solve them on a day-to-day basis?",
    questionIndex: 2,
    likes: 27,
    isStrikeThrough: false,
  },
];

const QTBATable = (): JSX.Element => {
  const classes = useStyles();
  const [votedQuestionIndexes, setVotedQuestionsIndexes] = useState<number[]>([]);

  const handleVoteQuestion = (questionIndex: number): void => {
    if (votedQuestionIndexes.includes(questionIndex)) {
      return; // already in vote
    }

    setVotedQuestionsIndexes((prevState) => [...prevState, questionIndex]);
  };

  const handleUnvoteQuestion = (questionIndex: number): void => {
    if (!votedQuestionIndexes.includes(questionIndex)) {
      return;
    }

    const updatedQuestionIndexes = votedQuestionIndexes.filter(
      (questionIndexInArray) => questionIndexInArray !== questionIndex
    );
    setVotedQuestionsIndexes(updatedQuestionIndexes);
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

  const renderTableRow = (question: string, questionIndex: number): JSX.Element => {
    return (
      <tr className={classes.tableBodyRow} key={questionIndex}>
        <td className={classes.tableBodyRowColumn}>
          <Typography variant='body2' color='textSecondary'>
            {questionIndex}
          </Typography>
        </td>
        <td className={classes.tableBodyRowColumn}>
          <Typography variant='body2' color='textSecondary'>
            {question}
          </Typography>
        </td>
        <td className={classes.tableBodyRowColumn}>
          {!votedQuestionIndexes.includes(questionIndex) && (
            <IconButton size='small' onClick={() => handleVoteQuestion(questionIndex)}>
              <CheckCircleIcon fontSize='small' color='disabled' />
            </IconButton>
          )}
          {votedQuestionIndexes.includes(questionIndex) && (
            <IconButton size='small' onClick={() => handleUnvoteQuestion(questionIndex)}>
              <CheckedCircleIcon fontSize='small' color='primary' />
            </IconButton>
          )}
        </td>
        <td className={classes.tableBodyRowColumn}>
          <QuestionMeatballsMenu />
        </td>
      </tr>
    );
  };

  return (
    <div className={classes.root}>
      <table className={classes.table} cellSpacing={0} cellPadding={0}>
        {renderTableHeader()}
        <tbody>
          {QUESTIONS_BANK.map((qtba) => {
            const { question, questionIndex } = qtba;
            return renderTableRow(question, questionIndex);
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QTBATable;
