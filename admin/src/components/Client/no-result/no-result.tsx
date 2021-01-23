import React from "react";
import NoResultSvg from "./no-result.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./no-result.style";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import { Button } from "components/Client/button/button";
// import { SearchContext } from 'contexts/search/search.context';
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

type NoResultFoundProps = {
  id?: string;
};

const NoResultFound: React.FC<NoResultFoundProps> = ({ id }) => {
  const history = useHistory();
  // const { dispatch } = React.useContext(SearchContext);

  function onClickButton() {
    history.goBack();
  }

  return (
    <NoResultWrapper id={id}>
      <h3>
        <FormattedMessage id="noResultFound" defaultMessage="Sorry, No result found :(" />
      </h3>

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button>
            <ArrowPrev /> Go Back
          </Button>
        </div>
      </ButtonWrapper>
    </NoResultWrapper>
  );
};

export default NoResultFound;
