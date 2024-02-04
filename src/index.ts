import path from "node:path";
import inquirer from 'inquirer';
import { exec } from 'child_process';

const nameResponse = await inquirer.prompt({
  name: "folderName",
  message: "Project's name",
  default: 'my-project',
});

const projectType: {projectType: "Vite" | "Next.js"} = await inquirer.prompt({
  type: 'list',
  name: "projectType",
  message: "Choose the type of project",
  choices: ["Vite", "Next.js"],
});

const pathDestination = path.resolve(process.cwd(), nameResponse.folderName);

const comando = {
  "vite": `git clone https://github.com/ynoacamino/init-project-vite.git ${pathDestination} && cd ${pathDestination} && git remote remove origin && npm install`,
  "next": `git clone https://github.com/ynoacamino/init-project-next.git ${pathDestination} && cd ${pathDestination} && git remote remove origin && npm install`,
}

exec(projectType.projectType === "Vite" ? comando.vite : comando.next, (error) => {
  if (error) {
    console.error('Error al ejecutar el comando:', error);
    return;
  }

  console.log('Projecto inicializado correctamente! 🚀');
});