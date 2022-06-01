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
import { ReactComponent as SquadIcon } from "../svg/dice/squad.svg";
import { ReactComponent as FeatIcon } from "../svg/dice/feat.svg";
import { ReactComponent as TacticIcon } from "../svg/dice/tactic.svg";
import { ReactComponent as LeaderIcon } from "../svg/dice/leader.svg";
import { ReactComponent as RetreatIcon } from "../svg/dice/retreat.svg";
import { ReactComponent as ConfusionIcon } from "../svg/dice/confusion.svg";

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
    squad: {
        title: "Esquadra",
        icon: SquadIcon,
    },
    leader: {
        title: "Líder",
        icon: LeaderIcon,
    },
    tactic: {
        title: "Tàctica",
        icon: TacticIcon,
    },
    feat: {
        title: "Proesa",
        icon: FeatIcon,
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
};

for (var [key, value] of Object.entries(diceFaces)) {
    value.id = key;
}
