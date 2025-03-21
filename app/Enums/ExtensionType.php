<?php

namespace App\Enums;

enum ExtensionType: string
{
    case Plugin = 'plugin';
    case Theme = 'theme';
    case Unknown = 'unknown';
}
