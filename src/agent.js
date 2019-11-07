import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = "https://conduit.productionready.io/api";
const API_ROOT = 'http://localhost:8000/api';

const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: (url) => superagent
    .del(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .then(responseBody),
  get: (url) => superagent
    .get(`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .then(responseBody),
  put: (url, body) => superagent
    .put(`${API_ROOT}${url}`, body)
    .use(tokenPlugin)
    .then(responseBody),
  post: (url, body) => superagent
    .post(`${API_ROOT}${url}`, body)
    .use(tokenPlugin)
    .then(responseBody),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: (user) => requests.put('/user', { user }),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article) => ({ ...article, slug: undefined });
const Articles = {
  all: (page) => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug) => requests.del(`/articles/${slug}`),
  favorite: (slug) => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) => requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/articles/feed?limit=10&offset=0'),
  get: (slug) => requests.get(`/articles/${slug}`),
  unfavorite: (slug) => requests.del(`/articles/${slug}/favorite`),
  update: (article) => requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article) => requests.post('/articles', { article }),
};

const Grants = {
  all: (page) => requests.get(`/grants?${limit(10, page)}`),
  byAuthor: (author, page) => requests.get(`/grants?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) => requests.get(`/grants?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug) => requests.del(`/grants/${slug}`),
  favorite: (slug) => requests.post(`/grants/${slug}/favorite`),
  favoritedBy: (author, page) => requests.get(`/grants?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/grants/feed?limit=10&offset=0'),
  get: (slug) => requests.get(`/grants/${slug}`),
  unfavorite: (slug) => requests.del(`/grants/${slug}/favorite`),
  update: (grant) => requests.put(`/grants/${grant.slug}`, { grant: omitSlug(grant) }),
  create: (grant) => requests.post('/grants', { grant }),
};

const Foundations = {
  all: () => requests.get('/foundations'),
  byTag: (tag, page) => requests.get(`/foundations?tag=${encode(tag)}&${limit(10, page)}`),
  del: (name) => requests.del(`/foundations/${name}`),
  favorite: (name) => requests.post(`/foundations/${name}/favorite`),
  favoritedBy: (author, page) => requests.get(`/foundations?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/foundations/feed?limit=10&offset=0'),
  get: (name) => requests.get(`/foundations/${name}`),
  unfavorite: (name) => requests.del(`/foundations/${name}/favorite`),
  update: (foundation) => requests.put(`/foundations/${foundation.name}`, { foundation: omitSlug(foundation) }),
  create: (foundation) => requests.post('/foundations', { foundation }),
};

const Comments = {
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug) => requests.get(`/articles/${slug}/comments`),
};

const Profile = {
  follow: (username) => requests.post(`/profiles/${username}/follow`),
  get: (username) => requests.get(`/profiles/${username}`),
  unfollow: (username) => requests.del(`/profiles/${username}/follow`),
};

export default {
  Articles,
  Auth,
  Comments,
  Grants,
  Foundations,
  Profile,
  Tags,
  setToken: (_token) => {
    token = _token;
  },
};
