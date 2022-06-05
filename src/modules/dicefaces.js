import { ReactComponent as CriticalIcon } from "../svg/dice/critical.svg";
import { ReactComponent as SupressionIcon } from "../svg/dice/supression.svg";
import { ReactComponent as MovementIcon } from "../svg/dice/movement.svg";
import { ReactComponent as RangeIcon } from "../svg/dice/range.svg";
import { ReactComponent as CoverIcon } from "../svg/dice/cover.svg";
import { ReactComponent as VisibilityIcon } from "../svg/dice/visibility.svg";
import { ReactComponent as ShockIcon } from "../svg/dice/shock.svg";
import { ReactComponent as DisorderedIcon } from "../svg/dice/disordered.svg";
import { ReactComponent as VeterancyIcon } from "../svg/dice/veterancy.svg";
import { ReactComponent as HitIcon } from "../svg/dice/hit.svg";
import { ReactComponent as SpecialIcon } from "../svg/dice/special.svg";
import { ReactComponent as TeamIcon } from "../svg/dice/team.svg";
import { ReactComponent as UnitIcon } from "../svg/dice/unit.svg";
import { ReactComponent as InspirationIcon } from "../svg/dice/inspiration.svg";
import { ReactComponent as TacticIcon } from "../svg/dice/tactic.svg";
import { ReactComponent as LeaderIcon } from "../svg/dice/leader.svg";
import { ReactComponent as WillpowerIcon } from "../svg/dice/willpower.svg";
import { ReactComponent as RetreatIcon } from "../svg/dice/retreat.svg";
import { ReactComponent as ConfusionIcon } from "../svg/dice/confusion.svg";
import { ReactComponent as DelayIcon } from "../svg/dice/delay.svg";

export const diceFaces = {
    // Attack
    critical: {
        title: "crític",
        icon: CriticalIcon,
    },
    hit: {
        title: "impacte",
        icon: HitIcon,
    },
    supression: {
        title: "supressió",
        icon: SupressionIcon,
    },
    special: {
        title: "especial",
        icon: SpecialIcon,
    },
    // Defense
    movement: {
        title: "moviment",
        icon: MovementIcon,
    },
    range: {
        title: "distància",
        icon: RangeIcon,
    },
    cover: {
        title: "cobertura",
        icon: CoverIcon,
    },
    visibility: {
        title: "visibilitat",
        icon: VisibilityIcon,
    },
    veterancy: {
        title: "veterania",
        icon: VeterancyIcon,
    },
    // Shock
    shock: {
        title: "xoc",
        icon: ShockIcon,
    },
    disordered: {
        title: "desordre",
        icon: DisorderedIcon,
    },
    // Command
    team: {
        title: "Equip",
        icon: TeamIcon,
    },
    unit: {
        title: "Unitat",
        icon: UnitIcon,
    },
    leader: {
        title: "Líder",
        icon: LeaderIcon,
    },
    tactic: {
        title: "Tàctica",
        icon: TacticIcon,
    },
    inspiration: {
        title: "Inspiració",
        icon: InspirationIcon,
    },
    willpower: {
        title: "Voluntat",
        icon: WillpowerIcon,
    },
    // Force morale
    retreat: {
        title: "Retirada",
        icon: RetreatIcon,
    },
    confusion: {
        title: "Confusió",
        icon: ConfusionIcon,
    },
    // Initiative
    delay: {
        title: "Temps",
        icon: DelayIcon,
    },
};

for (var [key, value] of Object.entries(diceFaces)) {
    value.id = key;
}
