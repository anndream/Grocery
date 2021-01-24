import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "utils/site-theme/default";
import { AppProvider } from "context/Client/app/app.provider";
import { AuthProvider } from "context/Client/auth/auth.provider";
import { LanguageProvider } from "context/Client/language/language.provider";
import { CartProvider } from "context/Client/cart/use-cart";
import { useMedia } from "utils/use-media";
import AppLayout from "./layouts/app-layout";

// External CSS import here
import "swiper/swiper-bundle.min.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/multi-carousel/multi-carousel.style.css";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/scrollbar/scrollbar.css";
import "@redq/reuse-modal/lib/index.css";

import { GlobalStyle } from "assets/styles/global.style";

// Language translation messages
import { messages } from "utils/site-translation/messages";
import "typeface-lato";
import "typeface-poppins";
// need to provide types
export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");
  return (
    <ThemeProvider theme={defaultTheme}>
      <LanguageProvider messages={messages}>
        <CartProvider>
          <AppProvider>
            <AuthProvider>
              <AppLayout>
                <Component {...pageProps} deviceType={{ mobile, tablet, desktop }} />
              </AppLayout>
              <GlobalStyle />
            </AuthProvider>
          </AppProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
