import _ from "underscore";
import request from "request";
import async from "async";
import util from "../utils/Util";
import hubUtil from "../utils/HubUtil";
import repositoryServerActions from "../actions/RepositoryServerActions";
import tagServerActions from "../actions/TagServerActions";
import os from "os";
var cachedRequest = require("cached-request")(request);
var cacheDirectory = os.tmpdir() + "/cachekitematic";
cachedRequest.setCacheDirectory(cacheDirectory);
cachedRequest.setValue("ttl", 3000);

let REGHUB2_ENDPOINT =
  process.env.REGHUB2_ENDPOINT || "https://hub.docker.com/v2";
let searchReq = null;
let PAGING = 24;

module.exports = {
  // Normalizes results from search to v2 repository results
  normalize: function(repo) {
    let obj = _.clone(repo);
    if (obj.is_official) {
      obj.namespace = "library";
    } else {
      let [namespace, name] = repo.name.split("/");
      obj.namespace = namespace;
      obj.name = name;
    }

    return obj;
  },

  search: function(query, page, sorting = null) {
    if (searchReq) {
      if (searchReq.request) {
        searchReq.request.abort();
      }
      searchReq = null;
    }

    if (!query) {
      repositoryServerActions.resultsUpdated({ repos: [] });
    }
    /**
     * Sort:
     * All - no sorting
     * ordering: -start_count
     * ordering: -pull_count
     * is_automated: 1
     * is_official: 1
     */

    searchReq = cachedRequest(
      {
        url: `${REGHUB2_ENDPOINT}/search/repositories/?`,
        qs: { query: query, page: page, page_size: PAGING, sorting }
      },
      (error, response, body) => {
        if (error) {
          repositoryServerActions.error({ error });
        }
        let myImages = {
          recommended: [
            "kitematic/html",
            "kitematic/ghost",
            "jenkins",
            "redis",
            "rethinkdb",
            "kitematic/minecraft",
            "elasticsearch",
            "postgres",
            "ubuntu-upstart",
            "memcached",
            "rabbitmq",
            "celery",
            "mysql",
            "mongo",
            "mariadb",
            "percona",
            "crate"
          ],
          repos: [
            {
              repo: "kitematic/hello-world-nginx",
              gradient_start: "#24B8EB",
              gradient_end: "#218CF4",
              img: "kitematic_html.png"
            },
            {
              repo: "ghost",
              gradient_start: "#262A2D",
              gradient_end: "#14181C",
              img: "ghost.png"
            },
            {
              repo: "jenkins",
              gradient_start: "#47728C",
              gradient_end: "#325062",
              img: "jenkins.png"
            },
            {
              repo: "redis",
              gradient_start: "#DA2D1D",
              gradient_end: "#A61F1C",
              img: "redis.png"
            },
            {
              repo: "rethinkdb",
              gradient_start: "#1E3F4C",
              gradient_end: "#183B47",
              img: "rethinkdb.png"
            },
            {
              repo: "kitematic/minecraft",
              gradient_start: "#5A5952",
              gradient_end: "#262622",
              img: "kitematic_minecraft.png"
            },
            {
              repo: "solr",
              gradient_start: "#d9411e",
              gradient_end: "#c12e24",
              img: "solr.png"
            },
            {
              repo: "elasticsearch",
              gradient_start: "#74B63F",
              gradient_end: "#569523",
              img: "elasticsearch.png"
            },
            {
              repo: "postgres",
              gradient_start: "#2E6093",
              gradient_end: "#16406B",
              img: "postgres.png"
            },
            {
              repo: "ubuntu-upstart",
              gradient_start: "#DF4700",
              gradient_end: "#E74A00",
              img: "ubuntu-upstart.png"
            },
            {
              repo: "memcached",
              gradient_start: "#4DB175",
              gradient_end: "#1D9E52",
              img: "memcached.png"
            },
            {
              repo: "rabbitmq",
              gradient_start: "#FF7F00",
              gradient_end: "#F77B00",
              img: "rabbitmq.png"
            },
            {
              repo: "celery",
              gradient_start: "#BDD36D",
              gradient_end: "#8DAF44",
              img: "celery.png"
            },
            {
              repo: "mysql",
              gradient_start: "#2F6073",
              gradient_end: "#1A4E62",
              img: "mysql.png"
            },
            {
              repo: "mongo",
              gradient_start: "#8F714B",
              gradient_end: "#442D21",
              img: "mongo.png"
            },
            {
              repo: "mariadb",
              gradient_start: "#D2B08A",
              gradient_end: "#956841",
              img: "mariadb.png"
            }
          ]
        };
        let data = myImages;
        let repos = _.map(data.results, result => {
          result.name = result.repo_name;
          return this.normalize(result);
        });
        let next = data.next;
        let previous = data.previous;
        let total = Math.floor(data.count / PAGING);
        if (response.statusCode === 200) {
          repositoryServerActions.resultsUpdated({
            repos,
            page,
            previous,
            next,
            total
          });
        }
      }
    );
  },

  recommended: function() {
    cachedRequest(
      {
        url: "https://kitematic.com/recommended.json"
      },
      (error, response, body) => {
        if (error) {
          repositoryServerActions.error({ error });
          return;
        }

        if (response.statusCode !== 200) {
          repositoryServerActions.error({
            error: new Error(
              "Could not fetch recommended repo list. Please try again later."
            )
          });
          return;
        }
        let myImages = {
          recommended: [
            "kitematic/html",
            "kitematic/ghost",
            "jenkins",
            "redis",
            "rethinkdb",
            "kitematic/minecraft",
            "elasticsearch",
            "postgres",
            "ubuntu-upstart",
            "memcached",
            "rabbitmq",
            "celery",
            "mysql",
            "mongo",
            "mariadb",
            "percona",
            "crate"
          ],
          repos: [
            {
              repo: "jenkins",
              gradient_start: "#47728C",
              gradient_end: "#325062",
              img: "jenkins.png"
            },
            {
              repo: "redis",
              gradient_start: "#DA2D1D",
              gradient_end: "#A61F1C",
              img: "redis.png"
            },
            {
              repo: "rethinkdb",
              gradient_start: "#1E3F4C",
              gradient_end: "#183B47",
              img: "rethinkdb.png"
            },

            {
              repo: "solr",
              gradient_start: "#d9411e",
              gradient_end: "#c12e24",
              img: "solr.png"
            },
            {
              repo: "elasticsearch",
              gradient_start: "#74B63F",
              gradient_end: "#569523",
              img: "elasticsearch.png"
            },
            {
              repo: "postgres",
              gradient_start: "#2E6093",
              gradient_end: "#16406B",
              img: "postgres.png"
            },
            {
              repo: "ubuntu-upstart",
              gradient_start: "#DF4700",
              gradient_end: "#E74A00",
              img: "ubuntu-upstart.png"
            },
            {
              repo: "memcached",
              gradient_start: "#4DB175",
              gradient_end: "#1D9E52",
              img: "memcached.png"
            },
            {
              repo: "rabbitmq",
              gradient_start: "#FF7F00",
              gradient_end: "#F77B00",
              img: "rabbitmq.png"
            },
            {
              repo: "celery",
              gradient_start: "#BDD36D",
              gradient_end: "#8DAF44",
              img: "celery.png"
            },
            {
              repo: "mysql",
              gradient_start: "#2F6073",
              gradient_end: "#1A4E62",
              img: "mysql.png"
            },
            {
              repo: "mongo",
              gradient_start: "#8F714B",
              gradient_end: "#442D21",
              img: "mongo.png"
            },
            {
              repo: "mariadb",
              gradient_start: "#D2B08A",
              gradient_end: "#956841",
              img: "mariadb.png"
            }
          ]
        };
        let data = myImages;
        let repos = data.repos;
        async.map(
          repos,
          (repo, cb) => {
            var name = repo.repo;
            if (util.isOfficialRepo(name)) {
              name = "library/" + name;
            }

            cachedRequest(
              {
                url: `${REGHUB2_ENDPOINT}/repositories/${name}`
              },
              (error, response, body) => {
                if (error) {
                  repositoryServerActions.error({ error });
                  return;
                }

                if (response.statusCode === 200) {
                  let data = JSON.parse(body);
                  data.is_recommended = true;
                  _.extend(data, repo);
                  cb(null, data);
                } else {
                  repositoryServerActions.error({
                    error: new Error(
                      "Could not fetch repository information from Docker Hub."
                    )
                  });
                  return;
                }
              }
            );
          },
          (error, repos) => {
            repositoryServerActions.recommendedUpdated({ repos });
          }
        );
      }
    );
  },

  tags: function(repo, callback) {
    hubUtil.request(
      {
        url: `${REGHUB2_ENDPOINT}/repositories/${repo}/tags`,
        qs: { page: 1, page_size: 100 }
      },
      (error, response, body) => {
        if (response.statusCode === 200) {
          let data = JSON.parse(body);
          tagServerActions.tagsUpdated({ repo, tags: data.results || [] });
          if (callback) {
            return callback(null, data.results || []);
          }
        } else {
          repositoryServerActions.error({ repo });
          if (callback) {
            return callback(new Error("Failed to fetch tags for repo"));
          }
        }
      }
    );
  },

  // Returns the base64 encoded index token or null if no token exists
  repos: function(callback) {
    repositoryServerActions.reposLoading({ repos: [] });
    let namespaces = [];
    // Get Orgs for user
    hubUtil.request(
      {
        url: `${REGHUB2_ENDPOINT}/user/orgs/`,
        qs: { page_size: 1000 }
      },
      (orgError, orgResponse, orgBody) => {
        if (orgError) {
          repositoryServerActions.error({ orgError });
          if (callback) {
            return callback(orgError);
          }
          return null;
        }

        if (orgResponse.statusCode === 401) {
          hubUtil.logout();
          repositoryServerActions.reposUpdated({ repos: [] });
          return;
        }

        if (orgResponse.statusCode !== 200) {
          let generalError = new Error("Failed to fetch repos");
          repositoryServerActions.error({ error: generalError });
          if (callback) {
            callback({ error: generalError });
          }
          return null;
        }
        try {
          let orgs = JSON.parse(orgBody);
          orgs.results.map(org => {
            namespaces.push(org.orgname);
          });
          // Add current user
          namespaces.push(hubUtil.username());
        } catch (jsonError) {
          repositoryServerActions.error({ jsonError });
          if (callback) {
            return callback(jsonError);
          }
        }

        async.map(
          namespaces,
          (namespace, cb) => {
            hubUtil.request(
              {
                url: `${REGHUB2_ENDPOINT}/repositories/${namespace}`,
                qs: { page_size: 1000 }
              },
              (error, response, body) => {
                if (error) {
                  repositoryServerActions.error({ error });
                  if (callback) {
                    callback(error);
                  }
                  return null;
                }

                if (orgResponse.statusCode === 401) {
                  hubUtil.logout();
                  repositoryServerActions.reposUpdated({ repos: [] });
                  return;
                }

                if (response.statusCode !== 200) {
                  repositoryServerActions.error({
                    error: new Error(
                      "Could not fetch repository information from Docker Hub."
                    )
                  });
                  return null;
                }

                let data = JSON.parse(body);
                cb(null, data.results);
              }
            );
          },
          (error, lists) => {
            if (error) {
              repositoryServerActions.error({ error });
              if (callback) {
                callback(error);
              }
              return null;
            }

            let repos = [];
            for (let list of lists) {
              repos = repos.concat(list);
            }

            _.each(repos, repo => {
              repo.is_user_repo = true;
            });

            repositoryServerActions.reposUpdated({ repos });
            if (callback) {
              return callback(null, repos);
            }
            return null;
          }
        );
      }
    );
  }
};
