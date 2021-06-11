import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Commit, CommitSearchResult } from 'src/app/models/commit';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  commitsList: Commit[] = [];
  searchName = '';
  error = '';
  loading = false;

  constructor(
    protected githubService: GithubService,
    protected cdr: ChangeDetectorRef
  ) {
    this.githubService.commitsOfRepo().subscribe(
      (data: CommitSearchResult) => {
        if (data.total_count > 0) {
          this.commitsList = [...data.items];
        } else {
          this.commitsList = [];
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

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.searchControl.value || this.searchControl.value.trim() === '') {
      return;
    }

    this.searchName = this.searchControl.value;
    this._search();
  }

  private _search(): void {
    this.loading = true;

    this.githubService.searchCommitsInRepoByText(this.searchName)
      .subscribe(
        (data: CommitSearchResult) => {
          if (data.total_count > 0) {
            this.commitsList = [...data.items];
          } else {
            this.commitsList = [];
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

}
