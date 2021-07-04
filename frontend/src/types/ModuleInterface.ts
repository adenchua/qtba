export default interface ModuleInterface {
  _id: string;
  title: string;
  slug: string;
  createdDate: string;
  questions: string[];
  isVotingDisabled: boolean;
}
