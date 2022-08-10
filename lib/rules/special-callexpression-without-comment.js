/**
 * @fileoverview 调用某些对象方法时需要加上注释
 * @author hangye
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const findComments = (node) => {
  let parent = node.parent;
  while(parent) {
    if (parent.comments) {
      return parent.comments;
    }
    parent = parent.parent;
  }
  return null;
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "调用某些对象方法时需要加上注释",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          objName: {
            type: 'string',
          },
          propNames: {
            type: 'array',
          },
          commentName: {
            type: 'string',
          }
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      callWithoutComment: '"{{ callMethod }}"上需加上"{{ comment }}"开头的注释', // 带占位符的提示信息
      callWithoutRightComment: '"{{ callMethod }}"上的注释"{{ realComment }}"并非"{{ comment }}"开头' // 带占位符的提示信息
    }
  },
  create(context) {
    const options = context.options[0];
    const { objName, propNames, commentName } = options;
    const sourceCode = context.getSourceCode();
    return {
      CallExpression(node) {
        const curObjName = node.callee?.object?.name;
        const curPropName = node.callee?.property?.name;
        if (!objName || !propNames) {
          return;
        }
        if (curObjName !== objName || !propNames?.includes(curPropName)) {
          return;
        }
        // 获取当前这个语句的注释
        const comments = sourceCode.getCommentsBefore(node) || [];
        const curComment = comments.map(comment => comment.value).join(' ').trim();
        // 没加注释
        if (curComment?.trim() === '') {
          context.report({
            node,
            messageId: 'callWithoutComment',
            data: {
              callMethod: `${curObjName}.${curPropName}`,
              comment: commentName,
            }
          });
          return;
        }
        console.log('当前语句的注释为', curComment, curComment.includes('$note'));
        if (curComment.includes(commentName)) {
          return;
        }
        context.report({
          node,
          messageId: 'callWithoutRightComment',
          data: {
            callMethod: `${curObjName}.${curPropName}`,
            comment: commentName,
            realComment: curComment,
          }
        });
      }
    };
  },
};
