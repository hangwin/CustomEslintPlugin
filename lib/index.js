/**
 * @fileoverview 校验某些语句上面是否有注释的插件
 * @author hangye
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const rules = requireIndex(__dirname + "/rules");
module.exports = {
    // rules是必须的
    rules,
    // 增加configs配置
    configs: {
        // 配置了这个之后，就可以在其他项目中像下面这样使用了
        // extends: ['plugin:pluginName/recommended']
        recommended: {
            // 这里面其实就相当于一份你写好的.eslintrc.js文件
            // 你可以使用自己的规则，也可以在这里包含eslint的核心规则和第三方开源规则
            plugins: ['hcustom'],
            rules: {
                'hcustom/special-callexpression-without-comment': [
                    'error',
                    {
                        objName: 'test',
                        propNames: ['testCall'],
                        commentName: '$test',
                    },
                ],
            }
        }
    }
}



