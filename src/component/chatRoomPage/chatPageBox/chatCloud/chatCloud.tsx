import { Tabs } from '@arco-design/web-react';
import TabPane from '@arco-design/web-react/es/Tabs/tab-pane';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { selectGlobalAccount } from '@src/redux/account';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './chatCloud.module.scss';
import {
  AddUpText,
  GetMessage,
  getText,
  splitChineseTexts,
  TABSTYPE
} from './utils';
import WordCloud from 'wordcloud';

interface chatCloudProps {
  onClose: () => void;
}

export function ChatCloud(props: chatCloudProps): JSX.Element {
  /**
   * 公共区域
   */
  const { onClose } = props;

  const logineAccount = GetTtakLoginUser();
  const globalAccount = useSelector(selectGlobalAccount);
  if (logineAccount === '') return <></>;

  //   ===========================

  interface OPTIONSTYPE {
    [key: string]: TABSTYPE;
  }

  interface ElemntType {
    [key: string]: HTMLElement | null;
  }
  const onTabChange = (e: string): void => {
    const OPTIONS: OPTIONSTYPE = {
      all: TABSTYPE.ALL,
      mine: TABSTYPE.MINE,
      friend: TABSTYPE.FRIEND
    };
    // 获取所有聊天记录
    GetMessage(logineAccount[0].account, globalAccount, OPTIONS[e])
      .then((res) => {
        // 提取文字
        const allText = getText(res);

        // 分词
        const splitTxts = splitChineseTexts(allText);

        // 获取词频
        const textCount = AddUpText(splitTxts);

        const ElemntObj: ElemntType = {
          all: document.getElementById('all'),
          mine: document.getElementById('mine'),
          friend: document.getElementById('friend')
        };
        const allElement = ElemntObj[e];
        if (allElement !== null) {
          WordCloud(allElement, {
            list: textCount.slice(0, 100),
            gridSize: 20,
            weightFactor: 20,
            fontWeight: 'normal',
            fontFamily: 'Times, serif',
            color: 'random-light',
            backgroundColor: '#24292F',
            rotateRatio: 1
          });
        }
      })
      .catch((err) => console.log('出现问题', err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.mask} onClick={() => onClose()}></div>
      <Tabs
        key="card"
        tabPosition="left"
        type="rounded"
        className={styles.tab_container}
        onChange={(e) => onTabChange(e)}
      >
        <TabPane key="all" title="全部">
          <div className={styles.canvas_container}>
            <canvas id="all" width={'800'} height="450px"></canvas>
          </div>
        </TabPane>

        <TabPane key="mine" title="我的">
          <div className={styles.canvas_container}>
            <canvas id="mine" width={'800'} height="450px"></canvas>
          </div>
        </TabPane>

        <TabPane key="friend" title="好友">
          <div className={styles.canvas_container}>
            <canvas id="friend" width={'800'} height="450px"></canvas>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
