import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Item } from '@miniprojet/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, JsonPipe],
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  static MESSAGE_ERREUR_FICHIER = 'Aucun fichier sélectionné';

  private readonly _loader: LoaderService = inject(LoaderService);
  private readonly _api: ApiService = inject(ApiService);

  private _bsExcelData: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(
    []
  );
  excelData$: Observable<Item[]> = this._bsExcelData.asObservable();
  private _bsErreur: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  erreur$: Observable<string | null> = this._bsErreur.asObservable();

  async uploadFile(input: HTMLInputElement): Promise<void> {
    this._bsExcelData.next([]);
    this._bsErreur.next(null);
    if (!input.files || input.files.length === 0) {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
      return;
    }
    const file: File = input.files.item(0) as File;
    if (file) {
      console.log('Uploading file:', file.name);
      const items: Item[] = await this._loader.parseExcelFile(file);
      this._bsExcelData.next(items);
      this._api.sendToBackend$(items).subscribe(() => {
        console.log('Data sent to backend');
      });
    } else {
      this._bsErreur.next(LoaderComponent.MESSAGE_ERREUR_FICHIER);
    }
  }
}
