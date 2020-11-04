import * as React from 'react';
import { Suspense } from 'react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Typography, Spin } from 'antd';
import './RecommendPage.less';
import { getSiteData } from './util';

const { Title, Paragraph } = Typography;

interface RecommendBlockProps {
  main?: boolean;
  index: number;
}

const RecommendBlock = ({ main, index }: RecommendBlockProps) => {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const { title, popularize, description, img, href } = getSiteData([
    'recommendations',
    isZhCN ? 'cn' : 'en',
    index,
  ]);
  return (
    <a
      className={classNames('recommend-block', main && 'recommend-block-main')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (window.gtag) {
          window.gtag('event', '点击', {
            event_category: '首页推广',
            event_label: href,
          });
        }
      }}
    >
      <img src={img} alt={title} />
      {popularize && (
        <span className="recommend-popularize">
          <FormattedMessage id="app.home.popularize" />
        </span>
      )}
      <div className="recommend-content">
        <Title level={4}>{title}</Title>
        <Paragraph style={{ fontSize: 13 }}>{description}</Paragraph>
      </div>
    </a>
  );
};

export default function RecommendPageo() {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: -36 }}>
      <Suspense fallback={<Spin />}>
        <Col xs={24} sm={14}>
          <RecommendBlock index={0} main />
        </Col>
        <Col xs={24} sm={10}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <RecommendBlock index={1} />
            </Col>
            <Col span={24}>
              <RecommendBlock index={2} />
            </Col>
          </Row>
        </Col>
      </Suspense>
    </Row>
  );
}
