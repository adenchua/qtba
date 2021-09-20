import ModuleInterface from "./ModuleInterface";

export default interface PlatformInterface {
  _id: string;
  title: string;
  slug: string;
  createdDate: string;
  modules: string[];
  platformModules?: ModuleInterface[];
}
