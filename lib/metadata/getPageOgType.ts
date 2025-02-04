import type { Route } from 'nextjs-routes';

type OGPageType = 'Homepage' | 'Root page' | 'Regular page';

const OG_TYPE_DICT: Record<Route['pathname'], OGPageType> = {
  '/': 'Homepage',
  '/txs': 'Root page',
  '/internal-txs': 'Root page',
  '/txs/kettle/[hash]': 'Regular page',
  '/tx/[hash]': 'Regular page',
  '/blocks': 'Root page',
  '/block/[height_or_hash]': 'Regular page',
  '/block/countdown': 'Regular page',
  '/block/countdown/[height]': 'Regular page',
  '/accounts': 'Root page',
  '/accounts/label/[slug]': 'Root page',
  '/address/[hash]': 'Regular page',
  '/verified-contracts': 'Root page',
  '/contract-verification': 'Root page',
  '/address/[hash]/contract-verification': 'Regular page',
  '/tokens': 'Root page',
  '/token/[hash]': 'Regular page',
  '/token/[hash]/instance/[id]': 'Regular page',
  '/apps': 'Root page',
  '/apps/[id]': 'Regular page',
  '/stats': 'Root page',
  '/stats/[id]': 'Regular page',
  '/api-docs': 'Regular page',
  '/graphiql': 'Regular page',
  '/search-results': 'Regular page',
  '/auth/profile': 'Root page',
  '/account/rewards': 'Regular page',
  '/account/watchlist': 'Regular page',
  '/account/api-key': 'Regular page',
  '/account/custom-abi': 'Regular page',
  '/account/tag-address': 'Regular page',
  '/account/verified-addresses': 'Root page',
  '/public-tags/submit': 'Regular page',
  '/withdrawals': 'Root page',
  '/visualize/sol2uml': 'Regular page',
  '/csv-export': 'Regular page',
  '/deposits': 'Root page',
  '/output-roots': 'Root page',
  '/dispute-games': 'Root page',
  '/batches': 'Root page',
  '/batches/[number]': 'Regular page',
  '/blobs/[hash]': 'Regular page',
  '/ops': 'Root page',
  '/op/[hash]': 'Regular page',
  '/404': 'Regular page',
  '/name-domains': 'Root page',
  '/name-domains/[name]': 'Regular page',
  '/validators': 'Root page',
  '/gas-tracker': 'Root page',
  '/mud-worlds': 'Root page',
  '/token-transfers': 'Root page',
  '/advanced-filter': 'Root page',
  '/pools': 'Root page',
  '/pools/[hash]': 'Regular page',

  // service routes, added only to make typescript happy
  '/login': 'Regular page',
  '/sprite': 'Regular page',
  '/api/metrics': 'Regular page',
  '/api/monitoring/invalid-api-schema': 'Regular page',
  '/api/log': 'Regular page',
  '/api/media-type': 'Regular page',
  '/api/proxy': 'Regular page',
  '/api/csrf': 'Regular page',
  '/api/healthz': 'Regular page',
  '/api/config': 'Regular page',
  '/api/sprite': 'Regular page',
};

export default function getPageOgType(pathname: Route['pathname']) {
  return OG_TYPE_DICT[pathname];
}
