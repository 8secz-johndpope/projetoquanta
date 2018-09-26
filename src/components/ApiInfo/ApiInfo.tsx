import { observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../services/AppStore';
import { MiddlePanel, Row, Section } from '../../common-elements/';
import { Markdown } from '../Markdown/Markdown';
import { StyledMarkdownBlock } from '../Markdown/styled.elements';
import {
  ApiHeader,
  DownloadButton,
  InfoSpan,
  InfoSpanBox,
  InfoSpanBoxWrap,
} from './styled.elements';

export interface ApiInfoProps {
  store: AppStore;
}

interface Links {
  downloadSwaggerLink: string | undefined;
  downloadPostmanLink: string | undefined;
}

@observer
export class ApiInfo extends React.Component<ApiInfoProps, Links> {

  constructor(props){
    super(props);
    this.state = {
      downloadSwaggerLink : '',
      downloadPostmanLink: ''
    }
  }

  handleDownloadClick = e => {
    if (!e.target.href) {
      window.location.href = e.target.href;
    }
  };

  componentWillMount(){
    const { store } = this.props;
    const { info } = store.spec;

    Promise.all([info.downloadLink(), info.downloadPostmanLink()])
      .then(e => {
        this.setState({downloadPostmanLink: e[1], downloadSwaggerLink: e[0]});
    });
  }

  render() {
    const { store } = this.props;
    const { info, externalDocs } = store.spec;
    const hideDownloadButton = store.options.hideDownloadButton;

    const downloadSwaggerFilename = info.downloadFileName;
    const downloadPostmanFilename = info.downloadPostmanFileName;

    const license =
      (info.license && (
        <InfoSpan>
          License: <a href={info.license.url}>{info.license.name}</a>
        </InfoSpan>
      )) ||
      null;

    const website =
      (info.contact &&
        info.contact.url && (
          <InfoSpan>
            URL: <a href={info.contact.url}>{info.contact.url}</a>
          </InfoSpan>
        )) ||
      null;

    const email =
      (info.contact &&
        info.contact.email && (
          <InfoSpan>
            {info.contact.name || 'E-mail'}:{' '}
            <a href={'mailto:' + info.contact.email}>{info.contact.email}</a>
          </InfoSpan>
        )) ||
      null;

    const terms =
      (info.termsOfService && (
        <InfoSpan>
          <a href={info.termsOfService}>Terms of Service</a>
        </InfoSpan>
      )) ||
      null;

    return (
      <Section>
        <Row>
          <MiddlePanel className="api-info">
            <ApiHeader>
              {info.title} <span>({info.version})</span>
            </ApiHeader>
            {!hideDownloadButton && (
              <p>
                Fazer download da especificação OpenAPI:
                <DownloadButton
                  download={downloadSwaggerFilename}
                  target="_blank"
                  href={this.state.downloadSwaggerLink}
                  onClick={this.handleDownloadClick}
                >
                    Download
                </DownloadButton>
                <br/>
                <br/>
                Fazer download da coleção do Postman:
                <DownloadButton
                  download={downloadPostmanFilename}
                  target="_blank"
                  href={this.state.downloadPostmanLink}
                  onClick={this.handleDownloadClick}
                >
                  Download
                </DownloadButton>
              </p>
            )}
            <StyledMarkdownBlock>
              {((info.license || info.contact || info.termsOfService) && (
                <InfoSpanBoxWrap>
                  <InfoSpanBox>
                    {email} {website} {license} {terms}
                  </InfoSpanBox>
                </InfoSpanBoxWrap>
              )) ||
                null}

              {(externalDocs && (
                <p>
                  <a href={externalDocs.url}>{externalDocs.description || externalDocs.url}</a>
                </p>
              )) ||
                null}
            </StyledMarkdownBlock>
            <Markdown source={store.spec.info.description} />
          </MiddlePanel>
        </Row>
      </Section>
    );
  }
}
