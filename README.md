checklist
COMMON
- нужно переработать логику получения списка фонотипов, добавив поле принадлежности гласной/согласной/любому типу звука
- normality table переделать блок js в метод
- вынести цвета в отдельный файл и переиспользовать
- добавить в store структуру wordlist

PHONEMES
- как-то заменить bufheader в store
- добавить boolean isFound поле фонемам в таблице
- по клику на фонему дергать запрос инфо по конкретной фонеме и в сайд меню показывать кол-во найденных фонем, языки и т.д.

HEADER
- в меню хедера ссылкам навесить стили
- выходить из меню хедера по клику вне меню

WORDLIST
- пропадающий хедер таблицы на странице wordlist
- сделать рабочим селект на странице wordlist

BACKEND
- Некоторые фонемы дубируются из-за разного возможного написания, например ng. Нужно оставлять одно написание и суммировать встреченные экземпляры под одним написанием.
- Отсутствуют Manners:
    Vibrants=Trills+Tap-Flaps
    Liquids=Laterals+Rhotics
    Эти варианты тоже надо будет предлагать как фильтры на фронте
- Возможно, ларингальные надо включить как третий вариант для vocoid-contoid-laryngeal, подумать корректно ли это

Теоория:
- Пора начать оперировать правильными понятиями. Дифференциальные (различительные признаки)  фонем (distinctive features)
- Необходимо высчитывать вынужденную палательность. Б и Б' по разному воспринимаются, даже если в языке не являются разными фонемами.

# vue-phonosemantics3

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



