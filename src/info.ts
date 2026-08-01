import { PeopleDescriptor, ProjectData } from "./structs";
import data from "./info.json";

export const labels: string[] = data.labels;
export const email: string = data.email;
export const qq: number = data.qq;
export const otherContactWay: [string, string][] = data.otherContactWay;
export const languages: string[] = data.languages;
export const frameworks: string[] = data.frameworks;
export const learnings: string[] = data.learnings;
export const studios: PeopleDescriptor[] = data.studios;
export const teachers: PeopleDescriptor[] = data.teachers;
export const cakeIsLie: PeopleDescriptor[] = data.cakeIsLie;
export const specialFriends: Record<"lycaon" | "death", PeopleDescriptor> = data.specialFriends;
export const friends: PeopleDescriptor[] = data.friends;
export const projects: ProjectData[] = data.projects;
export const aliases: string[] = data.aliases;
