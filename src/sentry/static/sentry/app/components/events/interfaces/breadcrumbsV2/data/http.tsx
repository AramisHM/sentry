import React from 'react';
import omit from 'lodash/omit';

import ExternalLink from 'app/components/links/externalLink';
import {t} from 'app/locale';
import {defined} from 'app/utils';

import {BreadcrumbTypeHTTP} from '../types';
import Summary from './summary';

type Props = {
  breadcrumb: BreadcrumbTypeHTTP;
};

const Http = ({breadcrumb}: Props) => {
  const {data} = breadcrumb;

  const renderUrl = (url: any) => {
    if (typeof url === 'string') {
      return url.match(/^https?:\/\//) ? (
        <ExternalLink data-test-id="http-renderer-external-link" href={url}>
          {url}
        </ExternalLink>
      ) : (
        <span>{url}</span>
      );
    }

    try {
      return JSON.stringify(url);
    } catch {
      return t('Invalid URL');
    }
  };

  const statusCode = data?.status_code;

  return (
    <Summary kvData={omit(data, ['method', 'url', 'status_code'])}>
      {data?.method && <strong>{`${data.method} `}</strong>}
      {data?.url && renderUrl(data.url)}
      {defined(statusCode) && (
        <span data-test-id="http-renderer-status-code">{` [${statusCode}]`}</span>
      )}
    </Summary>
  );
};

export default Http;
