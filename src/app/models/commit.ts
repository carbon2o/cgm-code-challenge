export interface Commit {
    sha: string;
    node_id: string;
    url: string;
    html_url: string;
    comments_url: string;
    author: Author;
    committer: Committer;
    parents: Parents[];
    commit: CommitInfo;
}

export interface CommitInfo {
    author: {
        name: string;
        email: string;
        date: Date;
    };
    committer: {
        name: string;
        email: string;
        date: Date;
    };
    message: string;
    url: string;
    tree: {
        sha: string;
        url: string;
    };
    comment_count: number;
    verification: {
        verified: boolean;
        reason: string;
        signature: string;
        payload: string;
    }
}

export interface Author {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Committer {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Parents {
    sha: string;
    url: string;
    html_url: string;
}

export interface CommitSearchResult {
    total_count: number;
    incomplete_result: boolean;
    items: Commit[];
  }