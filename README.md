## 简述

该项目时间还是比较紧的，要做出的东西考虑复杂了，最终产品也是差强人意。有些功能不是特别好，存在多多少少的问题，要考虑的情况很多。在线状态和离线状态，消息传递不一样，还有在线状态的确定。开始项目技术的架构出现问题，没有太多的经验，然后在实践上存在问题。

我是前后端都写的，因为前期买了nest那本小册，跟着步骤搭起来一个后端服务，只是实现增删改查功能。消息存储和消息传送。使用过程中遇到一些困难。判断用户离线和在线状态，方案想了很长时间。最终是创建一个在线表存储用户登录状态的，可以后期计算登录时长的，但是这个功能没有实现。

这个项目还有就是比较麻烦的就是客户端的存储，看到浏览器有个indexDB数据库，就采用了离线存储聊天信息的。不过没有用原生的离线存储方案，而是采用封装好的库`dexix.js`，刚开始使用，不熟练，花了一点时间上手，用这个数据库和mysql还不一样，两头写存储，几乎写吐了。没有做好复用代码，哪里需要就在哪里写，这个是个很大的问题。后面还会codereview，重构一些代码，争取做到简洁有序。

在写代码过程中写了好多if else ，后期不好维护，看到一个策略模式，学习了一下。用于离线事件同步那了，用户发给对方消息，先判断是否在线，不在线就存放数据库同时在离线事件表 那注册记录一下，后面用户上线立即加载离线事件。因为涉及到一些事件，用了状态机（别人说的），也方便后期其他事件的扩展。

敲代码不能爽一会，苦了后面，写了像shi一样的代码，堆积如山就成了shi删。



## 项目技术栈

- react
  - redux / reduxjs/toolkit
  - arco design 字节出品墙裂推荐
  - tiptap 富文本编辑(聊天内容生成和显示都用到它)
  - reactrouter v6
  - wordcloud 生成词云
- socket.io 即时消息传递
- typescript
- dexie.js (indexDB)
- axios

## 任务列表:

**基础功能：**

- [x] 用户可以通过Web端注册/登录；

- [x] 用户可以设置昵称/头像/签名；

- [x] 用户可以通过用户ID添加好友；

- [x] 用户可以快速检索自己已经添加过的好友；

- [x] 用户可以进行文字聊天；

- [x] 用户可以使用系统提供的默认表情进行聊天；

- [x] 用户可以看到对方是否已经查看了消息；

- [x] 用户可以看到历史聊天记录；

**进阶功能：**

- [x] 用户希望文字颜色可以根据用户情绪变化；
- [x] 用户希望可以删除/屏蔽联系人；
- [ ] 用户希望可以自行上传表情包；
- [ ] 用户可以查看到历史聊天记录生成的词云；
- [ ] 用户希望可以过滤掉黄暴信息，但是不希望被误伤，如：请不要屏蔽“黑夜总会过去”；
- [x] 用户可以编辑文字格式，包括字体、字号、加粗、下划线、斜体、颜色等；
- [ ] 用户希望可以有联系人亲密度排行；

## 简单复盘





## 项目目录树



```
    |-src
    │  App.tsx
    │  global.css
    │  images.d.ts
    │  index.tsx
    │  styles.d.ts
    │
    ├─api
    │  │  index.ts
    │  │
    │  ├─chat
    │  │      index.ts
    │  │
    │  ├─collect
    │  │      index.ts
    │  │
    │  ├─login
    │  │      index.ts
    │  │
    │  └─user
    │          index.ts
    │
    ├─common
    │      data.ts
    │      handleMood.ts
    │      personInfo.ts
    │
    ├─component
    │  ├─addressBook
    │  │  ├─newFriends
    │  │  │  │  newFriend.module.scss
    │  │  │  │  newFriends.tsx
    │  │  │  │
    │  │  │  └─newFriendCard
    │  │  │          newFriendCard.module.scss
    │  │  │          newFriendCard.tsx
    │  │  │
    │  │  ├─photoPlayer
    │  │  │      photoPlayer.module.scss
    │  │  │      photoPlayer.tsx
    │  │  │
    │  │  ├─userInfo
    │  │  │      handleInfo.ts
    │  │  │      userInfo.module.scss
    │  │  │      userInfo.tsx
    │  │  │
    │  │  └─userList
    │  │      │  handlekeepFriendList.ts
    │  │      │  stateData.ts
    │  │      │  userList.module.scss
    │  │      │  userList.tsx
    │  │      │
    │  │      └─userListCard
    │  │              userListCard.module.scss
    │  │              userListCard.tsx
    │  │
    │  ├─application
    │  ├─chatRoomPage
    │  │  ├─chatConcatList
    │  │  │      chatConcatList.module.scss
    │  │  │      chatConcatList.tsx
    │  │  │      handleUpdateUserInfo.ts
    │  │  │
    │  │  ├─chatInputBox
    │  │  │  │  chatInputBox.module.scss
    │  │  │  │  chatInputBox.tsx
    │  │  │  │
    │  │  │  ├─chatExpandChatBox
    │  │  │  │  │  chatExpandChatBox.module.scss
    │  │  │  │  │  chatExpandChatBox.tsx
    │  │  │  │  │
    │  │  │  │  └─menuItems
    │  │  │  │          menuItem.tsx
    │  │  │  │          menuItems.module.scss
    │  │  │  │
    │  │  │  └─emoji
    │  │  │          emoji.module.scss
    │  │  │          emoji.tsx
    │  │  │
    │  │  ├─chatPageBox
    │  │  │  │  chatPageBox.module.scss
    │  │  │  │  chatPageBox.tsx
    │  │  │  │  data.ts
    │  │  │  │
    │  │  │  ├─chatCard
    │  │  │  │      chatCard.module.scss
    │  │  │  │      chatCard.tsx
    │  │  │  │
    │  │  │  ├─chatCloud
    │  │  │  │      chatCloud.module.scss
    │  │  │  │      chatCloud.tsx
    │  │  │  │      utils.ts
    │  │  │  │
    │  │  │  ├─friendSetting
    │  │  │  │      friendSetting.module.scss
    │  │  │  │      friendSetting.tsx
    │  │  │  │      handleDelete.ts
    │  │  │  │
    │  │  │  └─historyMessageBox
    │  │  │      │  historyMessage.module.scss
    │  │  │      │  historyMessage.tsx
    │  │  │      │
    │  │  │      └─historyMessageCard
    │  │  │              historyMessageCard.module.scss
    │  │  │              historyMessageCard.tsx
    │  │  │
    │  │  ├─chatPageLeftBar
    │  │  │  │  chatPageLeftBar.module.scss
    │  │  │  │  chatPageLeftBar.tsx
    │  │  │  │  handleOfflineEvents.ts
    │  │  │  │  leftOptions.tsx
    │  │  │  │
    │  │  │  └─leftUserCard
    │  │  │          leftUserCard.module.scss
    │  │  │          leftUserCard.tsx
    │  │  │
    │  │  ├─chatPageMain
    │  │  │      chatPageMain.module.scss
    │  │  │      chatPageMain.tsx
    │  │  │      handleScoket.ts
    │  │  │
    │  │  ├─chatPageTopBar
    │  │  │  │  chatPage.module.scss
    │  │  │  │  chatPageTopBar.tsx
    │  │  │  │  handleMessage.ts
    │  │  │  │
    │  │  │  ├─addUser
    │  │  │  │      addUser.module.scss
    │  │  │  │      addUser.tsx
    │  │  │  │
    │  │  │  └─userCard
    │  │  │          userCard.module.scss
    │  │  │          userCard.tsx
    │  │  │
    │  │  ├─contactPageTopBar
    │  │  │      contactPageTopBar.module.scss
    │  │  │      contactPageTopBar.tsx
    │  │  │
    │  │  └─contactSumaryCard
    │  │          contactSummaryCard.module.scss
    │  │          contactSummaryCard.tsx
    │  │
    │  ├─collect
    │  │  │  collect.module.scss
    │  │  │  collect.tsx
    │  │  │  types.ts
    │  │  │
    │  │  ├─collectBox
    │  │  │      collectBox.module.scss
    │  │  │      collectBox.tsx
    │  │  │
    │  │  ├─collectCard
    │  │  │      collectCard.module.scss
    │  │  │      collectCard.tsx
    │  │  │
    │  │  ├─collectMenu
    │  │  │      collectMenu.module.scss
    │  │  │      collectMenu.tsx
    │  │  │
    │  │  └─collectShow
    │  │          collectShow.module.scss
    │  │          collectShow.tsx
    │  │
    │  ├─home
    │  │  ├─homeHeader
    │  │  │      homeHeader.module.scss
    │  │  │      homeHeader.tsx
    │  │  │
    │  │  ├─homeIntro
    │  │  │      homeIntro.module.scss
    │  │  │      homeIntro.tsx
    │  │  │
    │  │  └─homeText
    │  │          homeText.module.scss
    │  │          homeText.tsx
    │  │
    │  ├─loding
    │  │      index.module.scss
    │  │      index.tsx
    │  │
    │  ├─login
    │  │  │  loginBox.module.scss
    │  │  │  loginBox.tsx
    │  │  │
    │  │  ├─loginBoxMobile
    │  │  │      loginBoxMobile.tsx
    │  │  │
    │  │  ├─loginLeftContainer
    │  │  │      left.module.scss
    │  │  │      loginLeftContainer.tsx
    │  │  │
    │  │  ├─loginMobile
    │  │  │      loginMobile.module.scss
    │  │  │      loginMobile.tsx
    │  │  │
    │  │  ├─registerLeftContainer
    │  │  │      register.module.scss
    │  │  │      registerLeftContainer.tsx
    │  │  │
    │  │  └─registerMobile
    │  │          registerMobile.module.scss
    │  │          registerMobile.tsx
    │  │
    │  ├─message
    │  │      notification.tsx
    │  │
    │  └─NotePage
    │      ├─Editor
    │      │      editor.module.scss
    │      │      editor.scss
    │      │      editor.tsx
    │      │
    │      ├─header
    │      │      header.module.scss
    │      │      header.tsx
    │      │
    │      └─myEditorMenuBar
    │              menu.module.scss
    │              menuBar.tsx
    │
    ├─contexts
    │      index.tsx
    │      socket.tsx
    │
    ├─database
    │  │  db.ts
    │  │  getMeesageCount.ts
    │  │  getUserInfo.ts
    │  │  hanleConcatSummaryCard.ts
    │  │  hanleDbService.ts
    │  │  setConcatList.ts
    │  │
    │  └─read
    │          readFriend.ts
    │
    ├─hooks
    │      debounce.ts
    │
    ├─images
    │  ├─icon
    │  │      expressionless_face_color.svg
    │  │      face.svg
    │  │      grinning_face_with_smiling_eyes_color.svg
    │  │      loudly_crying_face_color.svg
    │  │      pleading_face_color.svg
    │  │      product.svg
    │  │      smiling_face_with_smiling_eyes_color.svg
    │  │      worried_face_color.svg
    │  │
    │  └─pic
    │          422da67afafb403ca858731cef218324.jpeg
    │          anhui.jpg
    │          logo.png
    │          logo_transparent.png
    │          paper_plane.png
    │          tu.jpg
    │
    ├─pages
    │  ├─addressBook
    │  │      addressBook.module.scss
    │  │      addressBook.tsx
    │  │
    │  ├─application
    │  │      application.module.scss
    │  │      application.tsx
    │  │
    │  ├─chatPageFragment
    │  │  │  chatPageFragment.module.scss
    │  │  │  chatPageFragment.tsx
    │  │  │
    │  │  └─mine
    │  │      │  mine.module.scss
    │  │      │  mine.tsx
    │  │      │
    │  │      ├─photoWall
    │  │      │      photoWall.module.scss
    │  │      │      PhotoWall.tsx
    │  │      │
    │  │      └─social
    │  │              social.module.scss
    │  │              social.tsx
    │  │
    │  ├─collectPage
    │  │      collectPage.module.scss
    │  │      collectPage.tsx
    │  │
    │  ├─home
    │  │      home.module.scss
    │  │      Home.tsx
    │  │
    │  ├─login
    │  │      loginPage.module.scss
    │  │      loginPage.tsx
    │  │
    │  └─lostPage
    │          index.tsx
    │
    ├─redux
    │  │  hook.ts
    │  │  store.ts
    │  │
    │  ├─account
    │  │      index.ts
    │  │
    │  ├─notice
    │  │      index.ts
    │  │
    │  └─topBarMessageAlert
    │          index.ts
    │
    ├─request
    │      index.ts
    │      upload.ts
    │      url.ts
    │
    ├─routes
    │      authRoutes.tsx
    │      index.tsx
    │
    ├─styles
    │      color.scss
    │      _theme.scss
    │
    ├─types
    │      index.ts
    │
    └─util
        │  base64.ts
        │  Base644.ts
        │  cursorPosition.ts
        │  genUserList.ts
        │  handleChat.ts
        │  handleGroups.ts
        │  handleTime.ts
        │  inputParser.ts
        │  localStorage.ts
        │  util.ts
        │  valid.ts
        │
        └─handleJSON
                compareString.ts
                index.ts
                type.ts
```



