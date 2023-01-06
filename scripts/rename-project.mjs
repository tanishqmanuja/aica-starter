import { dirname, join } from "path";
import { pkgUp } from "pkg-up";
import replace from "replace-in-file";

const ROOT_PATH = dirname(await pkgUp());

const renameProject = async (opts) => {
  if (!(opts?.packageName && opts?.appName && opts.appId)) {
    console.log("Missing Params");
    return;
  }

  try {
    //package.json
    const packageJsonPath = join(ROOT_PATH, "./package.json");
    const packageJsonRes = await replace({
      files: packageJsonPath,
      from: /aica-starter/g,
      to: opts.packageName,
    });
    console.log(packageJsonPath, ":", packageJsonRes[0].hasChanged);

    // capacitor.config.ts
    const capacitorConfigPath = join(ROOT_PATH, "./capacitor.config.ts");
    const capacitorConfigRes = await replace({
      files: capacitorConfigPath,
      from: [/aica.starter.io/g, /aica-starter/g],
      to: [opts.appId, opts.appName],
    });
    console.log(capacitorConfigPath, ":", capacitorConfigRes[0].hasChanged);

    // build.gradle
    const buildGradlePath = join(ROOT_PATH, "./android/app/build.gradle");
    const buildGradleRes = await replace({
      files: buildGradlePath,
      from: /aica.starter.io/g,
      to: opts.appId,
    });
    console.log(buildGradlePath, ":", buildGradleRes[0].hasChanged);

    // strings.xml
    const stringsXmlPath = join(
      ROOT_PATH,
      "./android/app/src/main/res/values/strings.xml"
    );
    const stringsXmlRes = await replace({
      files: stringsXmlPath,
      from: [/aica.starter.io/g, /aica-starter/g],
      to: [opts.appId, opts.appName],
    });
    console.log(stringsXmlPath, ":", stringsXmlRes[0].hasChanged);

    console.log("Done!");
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

await renameProject({
  packageName: "example",
  appName: "Exmaple",
  appId: "example.starter.io",
});
