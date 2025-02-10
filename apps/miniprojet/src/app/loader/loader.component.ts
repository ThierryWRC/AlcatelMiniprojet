import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  static MESSAGE_ERREUR_FICHIER = 'Aucun fichier sélectionné';

  private readonly _loader: LoaderService = inject(LoaderService);

  private _bsErreur: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  erreur$: Observable<string | null> = this._bsErreur.asObservable();

  async uploadFile(input: HTMLInputElement): Promise<void> {
    this._bsErreur.next(null);
    if (!input.files || input.files.length === 0) {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
      return;
    }
    const file: File = input.files.item(0) as File;
    if (file) {
      console.log('Uploading file:', file.name);
      const data = await this._loader.parseExcelFile(file);
    } else {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
    }
  }
}
