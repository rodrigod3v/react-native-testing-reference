# 🧪 React Native Testing Reference

Repositório de referência com exemplos e configuração completa para testes unitários em **React Native**, utilizando:

* **Jest** — test runner e assertions
* **React Native Testing Library (RNTL)** — para testar componentes
* **@testing-library/jest-native** — para matchers personalizados
* **TypeScript** — com suporte configurado
* **babel-jest** — para transpilar o código no ambiente de testes

---

## ⚙️ Pré-requisitos

* Node.js 18
* react 18.2.0

---


## 🧩 Dependências de Teste

```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native jest-expo babel-jest @babel/preset-env @babel/preset-typescript typescript
```

---

## 🧠 Estrutura do projeto

```
react-native-testing-reference/
src/
└── components/
    └── Button/
        ├── index.js        (ou Button.js)
        ├── Button.test.js  (O teste do componente)
        ├── Button.css      (Os estilos do componente)
        └── types.ts        (Tipos TypeScript, se aplicável)
├── babel.config.js
├── jest.setup.ts
├── jest.config.js
├── package.json
└── .gitignore
```

---

## 🧰 babel.config.js

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'], // ou ['module:metro-react-native-babel-preset'] para RN puro
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@commons': './src/commons',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@services': './src/services',
            '@modules': './src/modules',
            '@theme': './src/theme',
          },
        },
      ],
    ],
  };
};

```

---

## 🧪 jest.setup.ts

```ts
import '@testing-library/jest-native/extend-expect'
import { jest } from '@jest/globals'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))
```

---

## 🚫 .gitignore

```
node_modules/
npm-debug.log
yarn-error.log
.expo/
android/
ios/
dist/
coverage/
jest-cache/
jest-transform-cache/
.vscode/
```

---

## 🧭 Scripts no package.json

```json
"scripts": {
  "start": "expo start",
  "test": "jest --verbose",
  "test:dev": "jest --watchAll --verbose --colors",
  "test:coverage": "jest --coverage",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "prepare": "husky install"
}
```

---

## 🧱 Exemplo de componente

```tsx
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

type Props = {
  label: string
  onPress: () => void
}

export function Button({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}
```

---

## 🧭 Exemplo de teste unitário

```tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from '@components/Button'

describe('Button component', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<Button label="Click me" onPress={() => {}} />)
    expect(getByText('Click me')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const mockFn = jest.fn()
    const { getByText } = render(<Button label="Press" onPress={mockFn} />)

    fireEvent.press(getByText('Press'))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
```

---

## 🧭 Rodando os testes

* Rodar todos os testes: `npm test`
* Rodar testes em modo watch: `npm run test:dev`
* Rodar testes com cobertura: `npm run test:coverage`

---

## 🧠 Autor

Rodrigo QA

---

## 🔗 Licença

MIT License © 2025
