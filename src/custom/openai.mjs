import 'dotenv/config';
import fs from 'fs';
import db from '../db.mjs';
import log from '../log.mjs';
import { OpenAI } from 'openai';
import { getCurrentDirname } from '../esm-filename.mjs';

const dirname = getCurrentDirname(import.meta);
const questionConfig = JSON.parse(fs.readFileSync(`${dirname}/question.json`, 'utf8'));
const answerConfig = JSON.parse(fs.readFileSync(`${dirname}/answer.json`, 'utf8'));

if (!process.env.OPENAI_API_KEY) {
    log.error('OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.');
    process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateQuestion() {
    // TODO: Implement question generation using OpenAI API
    return null;
}

export async function judgeAnswer() {
    // TODO: Implement answer judging using OpenAI API
    return null;
}