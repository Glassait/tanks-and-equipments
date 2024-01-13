import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldUrlPipe } from './field/url.pipe';
import { ImagePipe } from './image/image.pipe';
import { ReplacePipe } from './replace/replace.pipe';
import { SentenceCasePipe } from './sentenceCase/sentence-case.pipe';
import { InventoryPipe } from './inventory.pipe';
import { ToStringPipe } from './to-string.pipe';
import { WordingPipe } from './wording.pipe';

@NgModule({
    declarations: [FieldUrlPipe, ImagePipe, ReplacePipe, SentenceCasePipe, InventoryPipe, ToStringPipe, WordingPipe],
    imports: [CommonModule],
    exports: [FieldUrlPipe, ImagePipe, ReplacePipe, SentenceCasePipe, InventoryPipe, ToStringPipe, WordingPipe],
    providers: [SentenceCasePipe],
})
export class PipesModule {}
