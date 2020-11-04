import * as React from 'react';
import { Suspense } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { useIntl } from 'react-intl';
import './MorePage.less';
import { getSiteData } from './util';

interface MoreProps {
  title: string;
  description: string;
  date: string;
  img: string;
  source: 'zhihu' | 'yuque';
  href: string;
}

const MoreCards = () => {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const list = getSiteData(['extras', isZhCN ? 'cn' : 'en']);
  const icons = getSiteData(['icons']);
  return list.map(({ title, description, date, img, source, href }: MoreProps) => {
    return (
      <Col key={title} xs={24} sm={6}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (window.gtag) {
              window.gtag('event', '点击', {
                event_category: '首页文章',
                event_label: href,
              });
            }
          }}
        >
          <Card hoverable cover={<img alt={title} src={img} />} className="more-card">
            <Card.Meta title={title} description={description} />
            <div>
              {date}
              <span className="more-card-source">
                <img src={icons[source]} alt={source} />
              </span>
            </div>
          </Card>
        </a>
      </Col>
    );
  });
};

export default function MorePage() {
  return (
    <Row gutter={[24, 32]}>
      <Suspense fallback={<Spin />}>
        <MoreCards />
      </Suspense>
    </Row>
  );
}
