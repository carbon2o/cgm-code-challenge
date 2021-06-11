import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Repository, RepositorySearchResult } from 'src/app/models/repository';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  repositoryList: Repository[] = [];
  searchName = '';
  error = '';
  loading = false;

  constructor(
    protected githubService: GithubService,
    protected cdr: ChangeDetectorRef,
    protected router: Router
    ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.searchControl.value || this.searchControl.value.trim() === '') {
      return;
    }

    this.searchName = this.searchControl.value;
    this._search();
  }

  private _search(): void {
    this.loading = true;

    this.githubService.searchRepositoriesByName(this.searchName)
      .subscribe(
        (data: RepositorySearchResult) => {
          if (data.total_count > 0) {
            this.repositoryList = [...data.items];
          } else {
            this.repositoryList = [];
            this.error = 'Not found. Please try again or use a different name is the search input above.';
          }
          this.loading = false;
          this.cdr.detectChanges();
        },
        (err: HttpErrorResponse) => {
          this.error = err.statusText;
          this.loading = false;
        }
      );
  }

  rowDblClick(repo: Repository): void {
    this.githubService.setSelectedRepo(repo.full_name);
    this.router.navigate(['/commits']);
  }

}
