import { interfaces } from "inversify";
import SI from "@config/inversify.types";
import DefaultBuilder from "@src/Settings/FeatureBuilder/DefaultBuilder";
import AliasBuilder from "@src/Settings/FeatureBuilder/AliasBuilder";
import { Feature } from "@src/Enum";
import { SettingsBuilderFactory, SettingsFeatureBuildFactory } from "@config/inversify.factory.types";
import TemplatesBuilder from "@src/Settings/SettingBuilders/Templates/TemplatesBuilder";
import RulesBuiler from "@src/Settings/SettingBuilders/Rules/RulesBuilder";
import FeaturesBuilder from "@src/Settings/SettingBuilders/Features/FeaturesBuilder";
import UtilBuilder from "@src/Settings/SettingBuilders/Util/UtilBuilder";
import RulesDelimiterBuilder from "@src/Settings/SettingBuilders/Rules/RulesDelimiterBuilder";
import RulesPathsBuilder from "@src/Settings/SettingBuilders/Rules/RulesPathsBuilder";
import ProcessorBuilder from "../../src/Settings/SettingBuilders/Processor/ProcessorBuilder";
import NoteLinkBuilder from "@src/Settings/FeatureBuilder/NoteLinkBuilder";
import ExplorerBuilder from "@src/Settings/FeatureBuilder/ExplorerBuilder";

export default (c: interfaces.Container) => {
    c.bind(SI["settings:feature:builder"]).to(DefaultBuilder).whenTargetNamed("default");
    c.bind(SI["settings:feature:builder"])
        .to(AliasBuilder)
    .whenTargetNamed(Feature.Alias);
    c.bind(SI["settings:feature:builder"])
        .to(ExplorerBuilder)
        .whenTargetNamed(Feature.Explorer);
    c.bind(SI["settings:feature:builder"])
        .to(NoteLinkBuilder)
        .whenTargetNamed(Feature.NoteLink);
    c.bind<SettingsFeatureBuildFactory>(SI["factory:settings:feature:builder"]).toFunction((name: string) =>
        c.isBoundNamed(SI["settings:feature:builder"], name) ? c.getNamed(SI["settings:feature:builder"], name) : null
    );

    c.bind(SI["settings:builder"]).to(TemplatesBuilder).whenTargetNamed("main");
    c.bind(SI["settings:builder"]).to(FeaturesBuilder).whenTargetNamed("main");
    c.bind(SI["settings:builder"]).to(UtilBuilder).whenTargetNamed("main");
    c.bind(SI["settings:builder"]).to(RulesBuiler).whenTargetNamed("main");
    c.bind(SI["settings:builder"]).to(ProcessorBuilder).whenTargetNamed("main");

    c.bind(SI["settings:builder"]).to(RulesDelimiterBuilder).whenTargetNamed("rules");
    c.bind(SI["settings:builder"]).to(RulesPathsBuilder).whenTargetNamed("rules");

    c.bind<SettingsBuilderFactory>(SI["factory:settings:builder"]).toFunction((name: string) =>
        c.getAllNamed(SI["settings:builder"], name)
    );
};
