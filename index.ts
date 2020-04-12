#!/usr/bin/env node
import { promises as fs } from "fs";
import { name, description } from "./package.json";

const README_FILE = "./README.md";
const SNIPPETS_FOLDER = "./snippets";

enum Headings {
    H1 = 1,
    H2 = 2,
    H3 = 3
}

function heading(s: string, level: keyof typeof Headings) {
    const prefix = new Array(Headings[level]).fill("#");
    return `${prefix.toString().replace(/,/g, "")} ${s}`;
}

function link(s: string, href: string) {
    return `[${s}](${href})`;
}

function li(s: string) {
    return ` - ${s}`;
}

function prettify(s: string) {
    const text = [...s.replace(/[^a-zA-Z0-9]+/g, " ")];
    text[0] = text[0].toUpperCase();
    return text.join("");
}

async function main() {
    let readme = ``;

    function add(s: string) {
        readme = readme.concat(s);
    }

    function line() {
        readme = readme.concat("\n");
    }

    add(heading(prettify(name), "H1"));
    line();
    add(description);
    line();
    add(heading("Snippets", "H2"));
    line();

    const snippetFolders = await fs.readdir(SNIPPETS_FOLDER);
    for (const snippetFolderName of snippetFolders) {
        const snippetFolderPath = `${SNIPPETS_FOLDER}/${snippetFolderName}`;
        const stat = await fs.stat(snippetFolderPath);
        if (stat.isFile()) {
            console.error(`Found file ${snippetFolderName} inside snippets folder. All snippets should be placed inside the related folder (create one if no relevant folder exists).`);
            continue;
        }

        add(heading(prettify(snippetFolderName), "H3"));
        line();

        const snippets = await fs.readdir(snippetFolderPath);
        for (const snippet of snippets) {
            const snippetPath = `${snippetFolderPath}/${snippet}`;

            add(li(link(snippet, snippetPath)));
            line();
        }
    }

    await fs.writeFile(README_FILE, readme);
}

main();
