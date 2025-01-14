import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import type { Screen, ScreenSuccess } from './types';

import config from 'configs/app';
import { getResourceKey } from 'lib/api/useApiQuery';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import * as mixpanel from 'lib/mixpanel';
import { DialogBackdrop, DialogBody, DialogContent, DialogHeader, DialogRoot } from 'toolkit/chakra/dialog';
import ButtonBackTo from 'ui/shared/buttons/ButtonBackTo';

import AuthModalScreenConnectWallet from './screens/AuthModalScreenConnectWallet';
import AuthModalScreenEmail from './screens/AuthModalScreenEmail';
import AuthModalScreenOtpCode from './screens/AuthModalScreenOtpCode';
import AuthModalScreenSelectMethod from './screens/AuthModalScreenSelectMethod';
import AuthModalScreenSuccessEmail from './screens/AuthModalScreenSuccessEmail';
import AuthModalScreenSuccessWallet from './screens/AuthModalScreenSuccessWallet';

// TODO @tom2drum fix auth modal
const feature = config.features.account;

interface Props {
  initialScreen: Screen;
  onClose: (isSuccess?: boolean) => void;
  mixpanelConfig?: {
    wallet_connect?: {
      source: mixpanel.EventPayload<mixpanel.EventTypes.WALLET_CONNECT>['Source'];
    };
    account_link_info: {
      source: mixpanel.EventPayload<mixpanel.EventTypes.ACCOUNT_LINK_INFO>['Source'];
    };
  };
  closeOnError?: boolean;
}

const AuthModal = ({ initialScreen, onClose, mixpanelConfig, closeOnError }: Props) => {
  const [ steps, setSteps ] = React.useState<Array<Screen>>([ initialScreen ]);
  const [ isSuccess, setIsSuccess ] = React.useState(false);

  const router = useRouter();
  const csrfQuery = useGetCsrfToken();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if ('isAuth' in initialScreen && initialScreen.isAuth) {
      mixpanel.logEvent(mixpanel.EventTypes.ACCOUNT_LINK_INFO, {
        Status: 'Started',
        Type: initialScreen.type === 'connect_wallet' ? 'Wallet' : 'Email',
        Source: mixpanelConfig?.account_link_info.source ?? 'Profile dropdown',
      });
    } else {
      mixpanel.logEvent(mixpanel.EventTypes.LOGIN, {
        Action: 'Started',
        Source: mixpanel.getPageType(router.pathname),
      });
    }
  }, [ initialScreen, mixpanelConfig, router.pathname ]);

  const onNextStep = React.useCallback((screen: Screen) => {
    setSteps((prev) => [ ...prev, screen ]);
  }, []);

  const onPrevStep = React.useCallback(() => {
    setSteps((prev) => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const onReset = React.useCallback((isAuth?: boolean) => {
    isAuth || closeOnError ? onClose() : setSteps([ initialScreen ]);
  }, [ initialScreen, onClose, closeOnError ]);

  const onAuthSuccess = React.useCallback(async(screen: ScreenSuccess) => {
    setIsSuccess(true);

    if ('isAuth' in initialScreen && initialScreen.isAuth) {
      mixpanel.logEvent(mixpanel.EventTypes.ACCOUNT_LINK_INFO, {
        Status: 'Finished',
        Type: screen.type === 'success_wallet' ? 'Wallet' : 'Email',
        Source: mixpanelConfig?.account_link_info.source ?? 'Profile dropdown',
      });
    } else {
      mixpanel.logEvent(mixpanel.EventTypes.LOGIN, {
        Action: 'Success',
        Source: screen.type === 'success_wallet' ? 'Wallet' : 'Email',
      });
    }

    queryClient.setQueryData(getResourceKey('user_info'), () => screen.profile);
    await csrfQuery.refetch();
    onNextStep(screen);
  }, [ initialScreen, mixpanelConfig?.account_link_info.source, onNextStep, csrfQuery, queryClient ]);

  const onModalClose = React.useCallback(() => {
    onClose(isSuccess);
  }, [ isSuccess, onClose ]);

  const onModalOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    !open && onClose();
  }, [ onClose ]);

  const header = (() => {
    const currentStep = steps[steps.length - 1];
    switch (currentStep.type) {
      case 'select_method':
        return 'Select a way to login';
      case 'connect_wallet':
        return currentStep.isAuth ? 'Add wallet' : 'Continue with wallet';
      case 'email':
        return currentStep.isAuth ? 'Add email' : 'Continue with email';
      case 'otp_code':
        return 'Confirmation code';
      case 'success_email':
      case 'success_wallet':
        return 'Congrats!';
    }
  })();

  const content = (() => {
    const currentStep = steps[steps.length - 1];
    switch (currentStep.type) {
      case 'select_method':
        return <AuthModalScreenSelectMethod onSelectMethod={ onNextStep }/>;
      case 'connect_wallet':
        return (
          <AuthModalScreenConnectWallet
            onSuccess={ onAuthSuccess }
            onError={ onReset }
            isAuth={ currentStep.isAuth }
            source={ mixpanelConfig?.wallet_connect?.source }
          />
        );
      case 'email':
        return (
          <AuthModalScreenEmail
            onSubmit={ onNextStep }
            isAuth={ currentStep.isAuth }
            mixpanelConfig={ mixpanelConfig }
          />
        );
      case 'otp_code':
        return <AuthModalScreenOtpCode email={ currentStep.email } onSuccess={ onAuthSuccess } isAuth={ currentStep.isAuth }/>;
      case 'success_email':
        return (
          <AuthModalScreenSuccessEmail
            email={ currentStep.email }
            onConnectWallet={ onNextStep }
            onClose={ onModalClose }
            isAuth={ currentStep.isAuth }
            profile={ currentStep.profile }
          />
        );
      case 'success_wallet':
        return (
          <AuthModalScreenSuccessWallet
            address={ currentStep.address }
            onAddEmail={ onNextStep }
            onClose={ onModalClose }
            isAuth={ currentStep.isAuth }
            profile={ currentStep.profile }
          />
        );
    }
  })();

  if (!feature.isEnabled) {
    return null;
  }

  return (
    <DialogRoot open onOpenChange={ onModalOpenChange } size={{ base: 'full', lg: 'sm' }}>
      <DialogBackdrop/>
      <DialogContent>
        <DialogHeader
          startElement={ steps.length > 1 && !steps[steps.length - 1].type.startsWith('success') && <ButtonBackTo onClick={ onPrevStep }/> }
        >
          { header }
        </DialogHeader>
        <DialogBody>
          { content }
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default React.memo(AuthModal);
