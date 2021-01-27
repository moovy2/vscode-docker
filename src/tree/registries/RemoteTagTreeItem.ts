/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { ThemeIcon } from 'vscode';
import { AzExtTreeItemIntermediate } from '../AzExtTreeItemIntermediate';
import { getRegistryContextValue, tagSuffix } from './registryContextValues';
import { RemoteRepositoryTreeItemBase } from './RemoteRepositoryTreeItemBase';

dayjs.extend(relativeTime);

export class RemoteTagTreeItem extends AzExtTreeItemIntermediate {
    public parent: RemoteRepositoryTreeItemBase;
    public tag: string;
    public time: Date;

    public readonly id?: string; // Unused but needs to be implemented since it is abstract in the parent
    public resolveTooltipInternal: never; // Unused but needs to be implemented since it is abstract in the parent

    public constructor(parent: RemoteRepositoryTreeItemBase, tag: string, time: string) {
        super(parent);
        this.tag = tag;
        this.time = new Date(time);
    }

    public get label(): string {
        return this.tag;
    }

    public get contextValue(): string {
        return getRegistryContextValue(this, tagSuffix);
    }

    /**
     * The fullTag minus the registry part
     */
    public get repoNameAndTag(): string {
        return this.parent.repoName + ':' + this.tag;
    }

    public get fullTag(): string {
        return `${this.parent.parent.baseImagePath}/${this.repoNameAndTag}`;
    }

    public get description(): string {
        return dayjs(this.time).fromNow();
    }

    public get iconPath(): ThemeIcon {
        return new ThemeIcon('bookmark');
    }
}
