import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  static MESSAGE_ERREUR_FICHIER = 'Aucun fichier sélectionné';

  private _bsErreur: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  erreur$: Observable<string | null> = this._bsErreur.asObservable();

  uploadFile(input: HTMLInputElement): void {
    this._bsErreur.next(null);
    if (!input.files || input.files.length === 0) {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
      return;
    }
    const file: File = input.files.item(0) as File;
    if (file) {
      console.log('Uploading file:', file.name);
    } else {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
    }
  }
}
