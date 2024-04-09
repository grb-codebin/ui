import chalk from "chalk"
import { Command } from "commander"
import ora from "ora"
import prompts from "prompts"
import { z } from "zod"

import { logger } from "../utils/logger"

const initOptionsSchema = z.object({
  name: z.string().optional(),
})

export const gaurav = new Command()
  .name("gaurav")
  .description("Gaurav command")
  .option("-n, --name <name>", "Name of the user")
  .action(async (options) => {
    const { name } = initOptionsSchema.parse(options)
    if (name) {
      logger.info(`Hello ${name}`)
    } else {
      await promptForName()
    }

    const spinner = ora("Adding magic to your project").start()
    setTimeout(() => {
      spinner.succeed("Magic added successfully")
    }, 2000)
  })

async function promptForName() {
  const highlight = (text: string) => chalk.bold.red(text)
  const response = await prompts({
    type: "text",
    name: "name",
    message: `What is your name fellow asian ${highlight("traveller")}?`,
  })

  if (response.name) {
    logger.info(`Hello ${response.name}`)
  } else {
    logger.info("No name provided")
  }
}
