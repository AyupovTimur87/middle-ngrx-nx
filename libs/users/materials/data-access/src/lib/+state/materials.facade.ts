import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  filteredMaterials,
  selectAllFolders,
  selectAllMaterials,
  selectFoldersError,
  selectFoldersStatus, selectMaterialsErrors,
  selectMaterialsStatus,
  selectOpenedFolder
} from './materials.selectors';
import { CreateFolder } from '../models/create-folder.model';
import { CreateMaterial } from '../models/create-material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.select(selectFoldersStatus);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly error$ = this.store.select(selectFoldersError);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);

  public readonly allMaterials$ = this.store.select(selectAllMaterials);
  public readonly materialsStatus$ = this.store.select(selectMaterialsStatus);
  public readonly materialsErrors$ = this.store.select(selectMaterialsErrors);
  public readonly filteredMaterials$ = this.store.select(filteredMaterials);

  public loadFolder() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public addFolder(materialsFolder: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder: materialsFolder }));
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public addMaterial(newMaterialData: CreateMaterial) {
    this.store.dispatch(MaterialsActions.addMaterials({materials: newMaterialData}));
  }
}
