import fs from 'fs'
import YAML from 'yaml'

const configFile = fs.readFileSync('./config.yml', 'utf8')

export const configYaml = YAML.parse(configFile)