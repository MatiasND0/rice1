import{a as n}from"./UX5Z4UUX.js";import{f as i}from"./3PS7M655.js";var A=`Ignore all previous instructions. You are a knowledgeable and helpful person that can answer any questions. Your task is to answer the following question delimited by triple backticks.

Question:
\`\`\`
{query}
\`\`\`

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by triple quotes, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

For your reference, today's date is {current_date}.

---

If you use any of the search results in your answer, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results below, delimited by triple quotes.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 150 words.

---

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

Search results:
"""
{web_results}
"""`;var h="webchatgpt",c="WEBCHATGPT_SEARCH_WITH_AI_ROOT_ID",l="WEBCHATGPT_SEARCH_WITH_AI_CONTAINER_ID",E=["MAXAI_SEARCH_WITH_AI_ROOT_ID"],p="SEARCH_WITH_AI_LOGO_ID",u=6,o={OPENAI:"OPENAI",USE_CHAT_GPT_PLUS:"USE_CHAT_GPT_PLUS",MAXAI_CLAUDE:"MAXAI_CLAUDE",OPENAI_API:"OPENAI_API",CLAUDE:"CLAUDE",BING:"BING",BARD:"BARD",FREE_AI:"FREE_AI",GEMINI:"GEMINI"};var r=i(n());var t="SEARCH_WITH_AI_STORAGE_KEY",s={aiProvider:o.OPENAI,enable:!0,triggerMode:"always",webAccessPrompt:!0},I=async()=>{let e=await r.default.storage.local.get(t);return e[t]?e[t]:s},d=async e=>{let a=await I()||s;await r.default.storage.local.set({[t]:{...a,...e}})};export{A as a,h as b,c,l as d,E as e,p as f,u as g,o as h,s as i,I as j,d as k};
