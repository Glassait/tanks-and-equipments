import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FoldNewsCardComponent } from 'fold';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldNewsCardComponent],
})
export class HomeComponent {
    @HostBinding('class')
    get cssClasses(): string[] {
        return ['fold-grid'];
    }
}
