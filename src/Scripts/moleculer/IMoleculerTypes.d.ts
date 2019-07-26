import { IMoleculerActions } from './IMoleculerTypes.d';
import { InputQuestion, Answers, Question } from "inquirer";
import { ICommon } from "../ICommon";
import { create } from 'domain';

export interface IMoleculerQuestions {
	entity: Question<ICommon.IAnswers>[];
	service: Question<ICommon.IAnswers>[];
	[key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
}

export interface IMoleculerActions {
	entity: Function;
	service: Function;
	[key: string]: Function;
}

export declare module IMoleculerHelper {
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

	export interface ICreateInterfaceParams {
		templatePath: string;
		indexInterfaceTemplate: string;
		folderIndexTemplate: string;
	}
}
