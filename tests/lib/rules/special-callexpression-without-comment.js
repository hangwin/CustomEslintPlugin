/**
 * @fileoverview 调用某些对象方法时需要加上注释
 * @author hangye
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/special-callexpression-without-comment"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const options = [{
  objName: 'report',
  propNames: ['waClick'],
  commentName: '$note',
}]
const ruleTester = new RuleTester();
ruleTester.run("special-callexpression-without-comment", rule, {
  valid: [
    {
      code: `// $note
      report.waClick('xxx');`,
      options
    },
    {
      code: `// $note注释
      report.waClick('xxx');`,
      options
    },
  ],

  invalid: [
    {
      code: `// 
      report.waClick('xxx');`,
      errors: [{ message: '"report.waClick"上需加上"$note"开头的注释', type: "CallExpression" }],
      options
    },
    {
      code: `// $note xxx2
      console.log(100)
      report.waClick('xxx');`,
      errors: [{ message: '"report.waClick"上需加上"$note"开头的注释', type: "CallExpression" }],
      options
    },
    {
      code: `
      console.log(100)
      report.waClick('xxx');
      // $note xxx3
      `,
      errors: [{ message: '"report.waClick"上需加上"$note"开头的注释', type: "CallExpression" }],
      options
    },
    {
      code: `
      // xxxx
      report.waClick('xxx');
      `,
      errors: [{ message: '"report.waClick"上的注释"xxxx"并非"$note"开头', type: "CallExpression" }],
      options
    },
  ],
});
