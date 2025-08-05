// stylelint.config.cjs

/** @type {import("stylelint").Config} */
module.exports = {
  customSyntax: 'postcss-scss',
  extends: [
    'stylelint-config-standard',     
    'stylelint-config-prettier',     
  ],
  plugins: ['stylelint-scss','stylelint-order',],      
  rules: {
    // 코드 품질
    'at-rule-no-unknown': null, 
    'scss/at-rule-no-unknown': true, 
    'no-empty-source': null,         
    'selector-class-pattern': null,   
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    
    // 코드 스타일
    'scss/dollar-variable-pattern': '^[_]?[a-z]+([a-z0-9-]+)*$', 
    'scss/at-rule-no-unknown': true, 
    'scss/percent-placeholder-pattern': null, 
    
    // 속성 순서
    'order/properties-order': [
      [
        // context 지정
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',

        // 레이아웃 관련 속성
        'display',
        'flex',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        
        // 크기 관련 속성
        'box-sizing',
        'overflow',
        'margin',
        'border',
        'padding',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',

        // 글꼴 및 텍스트 관련 속성
        'font',
        'font-size',
        'font-weight',
        'line-height',
        'color',
        'text-align',

        'background',
        'background-image',
        'background-repeat',
        'background-size',
        'box-shadow',
        'opacity',

        'transition',
        'animation',
        'transform',
        'will-change',
        'cursor',
      ],
      {
        unspecified: 'bottomAlphabetical', // 나열되지 않은 속성은 맨 아래 알파벳 순으로
        severity: 'warning',
      },
    ],
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/build/**',
  ],
}
