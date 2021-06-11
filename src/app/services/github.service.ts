import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Commit, CommitSearchResult } from '../models/commit';
import { RepositorySearchResult } from '../models/repository';

const SEARCH_ITEMS_PER_PAGE = 100;
const headers= new HttpHeaders()
  .set('Accept', 'application/vnd.github.cloak-preview');

@Injectable()
export class GithubService {
  public selectedRepo = '';

  constructor(private _http: HttpClient) { }

  public searchRepositoriesByName(name: string): Observable<RepositorySearchResult> {
    const url = this._generateSearchInRepositoriesUrl(name);

    return this._http.get<RepositorySearchResult>(url);
  }

  public commitsOfRepo(): Observable<CommitSearchResult> {
    const url = this._generateCommitsUrl();

    return this._http.get<any>(url).pipe(map(
      res => res = {
        items: [...res],
        total_count: res.length,
        incomplete_result: false}
    ));
  }

  public searchCommitsInRepoByText(text: string): Observable<CommitSearchResult> {
    const url = this._generateSearchInCommitsUrl(text);

    return this._http.get<CommitSearchResult>(url, { 'headers': headers });
  }

  private _generateSearchInRepositoriesUrl(name: string): string {
    return `https://api.github.com/search/repositories?q=${name}&per_page=${SEARCH_ITEMS_PER_PAGE}`;
  }

  private _generateSearchInCommitsUrl(text: string): string {
    if(text && text.trim() !== '') {
      return `https://api.github.com/search/commits?q=${text} repo:${this.selectedRepo}&per_page=${SEARCH_ITEMS_PER_PAGE}`;
    } else if (this.selectedRepo !== '' && text && text.trim() === '') {
      return `https://api.github.com/repos/${this.selectedRepo}/commits?per_page=${SEARCH_ITEMS_PER_PAGE}`;
    } else {
      return '';
    }
  }

  private _generateCommitsUrl(): string {
    if (this.selectedRepo !== '') {
      return `https://api.github.com/repos/${this.selectedRepo}/commits?per_page=${SEARCH_ITEMS_PER_PAGE}`;
    } else {
      return '';
    }
  }

  setSelectedRepo(repo: string): void {
    this.selectedRepo = repo;
  }
}
