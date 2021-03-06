// #region Global Imports
import { QuestionCollection, Question } from "inquirer";
// #region Global Imports

// #region Local Imports
import { ICommon } from ".";
// #region Local Imports

export type MoleculerElement = 'Service' | 'Repository';

export interface IMoleculerQuestions {
    Service: QuestionCollection<ICommon.IAnswers>;
    Repository: QuestionCollection<ICommon.IAnswers>;
    [key: string]: QuestionCollection<ICommon.IAnswers>;
}

export interface IMoleculerActions {
    Service: Function;
    Repository: Function;
    [key: string]: Function;
}

export declare namespace IMoleculerHelper {
	export interface IBrokerHelperTemplatesParams {
		replaceFileDir: string;
		brokerHelperImport: string;
		brokerHelperCreate: string;
	}

	export interface ICreateEntityHelperParams {
		templatePath: string;
		indexTemplate: string;
	}
	export interface ICreateServiceParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
		integrationTemplatePath: string;
		brokerHelperTemplatesParams: IBrokerHelperTemplatesParams;
		createServiceHelperParams: ICreateServiceHelperParams;
		createInterfaceParams: ICreateInterfaceParams;
	}
	export interface ICreateServiceHelperParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
	}

	export interface ICreateRepositoryParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
		createInterfaceParams: ICreateInterfaceParams;
		createEntityTemplatesParams: ICreateEntityHelperParams;
	}

	export interface ICreateInterfaceParams {
		templatePath: string;
		indexInterfaceTemplate: string;
		folderIndexTemplate: string;
	}
}
