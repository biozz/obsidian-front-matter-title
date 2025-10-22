import { Feature } from "@src/Enum";
import { NoteLink } from "./Utils/FileNoteLinkService";
import FeatureInterface from "@src/Interfaces/FeatureInterface";
import { SettingsEvent } from "@src/Settings/SettingsType";
import { CachedMetadata, TAbstractFile, TFile } from "obsidian";
import { NoteLinkChange } from "./Feature/NoteLink/NoteLinkTypes";
import { Events } from "front-matter-plugin-api-provider";

export type AppEvents = {
    "migrator:migrated": { from: string; to: string };
    "file:rename": { old: string; actual: string };
    "file:modify": TAbstractFile;
    "metadata:cache:changed": { path: string; cache: CachedMetadata };
    "manager:refresh": { id: Feature };
    "feature:state:changed": { id: Feature; enabled: boolean };
    "feature:enable": { feature: FeatureInterface<any> };
    "note:link:changes:approve": {
        path: string;
        changes: NoteLinkChange[];
    };
    "note:link:changes:execute": {
        path: string;
        changes: NoteLinkChange[];
    };
    "note:link:filter": {
        links: NoteLink[];
    };
    "layout:change": undefined;
    "active:leaf:change": undefined;
    "file:open": TFile | null;
} & SettingsEvent &
    Events;
