import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditModeService {

    private editModeSubject = new BehaviorSubject<boolean>(false);

    // Observable to listen changes
    public editMode$: Observable<boolean> = this.editModeSubject.asObservable();



    private editModePokemonSubject = new BehaviorSubject<boolean>(false);

    // Observable to listen changes
    public editModePokemon$: Observable<boolean> = this.editModeSubject.asObservable();

    // activate edit mode
    enableEditMode(): void {
        this.editModeSubject.next(true);
    }


    // activate edit mode for Pokemons
    enableEditModePokemon(): void {
        this.editModePokemonSubject.next(true);
    }

    // deactivate edit mode
    disableEditMode(): void {
        this.editModeSubject.next(false);
    }


    // deactivate edit mode
    disableEditModePokemon(): void {
        this.editModePokemonSubject.next(false);
    }

    // get current status
    isEditModeActive(): boolean {
        return this.editModeSubject.value;
    }


    isEditModePokemonActive(): boolean {
        return this.editModePokemonSubject.value;
    }
}
