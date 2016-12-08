"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var PluralPipe = (function () {
    function PluralPipe() {
    }
    PluralPipe.prototype.transform = function (value, args) {
        var number = parseInt(args[0]);
        if (isNaN(number) || number === 1) {
            return value;
        }
        else {
            return pluralize(value);
        }
    };
    PluralPipe = __decorate([
        core_1.Pipe({ name: 'pluralize', pure: false }), 
        __metadata('design:paramtypes', [])
    ], PluralPipe);
    return PluralPipe;
}());
exports.PluralPipe = PluralPipe;
function pluralize(s, revert) {
    if (revert === void 0) { revert = false; }
    var plural = {
        '(quiz)$': "$1zes",
        '^(ox)$': "$1en",
        '([m|l])ouse$': "$1ice",
        '(matr|vert|ind)ix|ex$': "$1ices",
        '(x|ch|ss|sh)$': "$1es",
        '([^aeiouy]|qu)y$': "$1ies",
        '(hive)$': "$1s",
        '(?:([^f])fe|([lr])f)$': "$1$2ves",
        '(shea|lea|loa|thie)f$': "$1ves",
        'sis$': "ses",
        '([ti])um$': "$1a",
        '(tomat|potat|ech|her|vet)o$': "$1oes",
        '(bu)s$': "$1ses",
        '(alias)$': "$1es",
        '(octop)us$': "$1i",
        '(ax|test)is$': "$1es",
        '(us)$': "$1es",
        '([^s]+)$': "$1s"
    };
    var singular = {
        '(quiz)zes$': "$1",
        '(matr)ices$': "$1ix",
        '(vert|ind)ices$': "$1ex",
        '^(ox)en$': "$1",
        '(alias)es$': "$1",
        '(octop|vir)i$': "$1us",
        '(cris|ax|test)es$': "$1is",
        '(shoe)s$': "$1",
        '(o)es$': "$1",
        '(bus)es$': "$1",
        '([m|l])ice$': "$1ouse",
        '(x|ch|ss|sh)es$': "$1",
        '(m)ovies$': "$1ovie",
        '(s)eries$': "$1eries",
        '([^aeiouy]|qu)ies$': "$1y",
        '([lr])ves$': "$1f",
        '(tive)s$': "$1",
        '(hive)s$': "$1",
        '(li|wi|kni)ves$': "$1fe",
        '(shea|loa|lea|thie)ves$': "$1f",
        '(^analy)ses$': "$1sis",
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
        '([ti])a$': "$1um",
        '(n)ews$': "$1ews",
        '(h|bl)ouses$': "$1ouse",
        '(corpse)s$': "$1",
        '(us)es$': "$1",
        's$': ""
    };
    var irregular = {
        'move': 'moves',
        'foot': 'feet',
        'goose': 'geese',
        'sex': 'sexes',
        'child': 'children',
        'man': 'men',
        'tooth': 'teeth',
        'person': 'people'
    };
    var uncountable = [
        'sheep',
        'fish',
        'deer',
        'series',
        'species',
        'money',
        'rice',
        'information',
        'equipment'
    ];
    if (uncountable.indexOf(s.toLowerCase()) >= 0) {
        return s;
    }
    for (var word in irregular) {
        var pattern = void 0;
        var replace = void 0;
        if (revert) {
            pattern = new RegExp(irregular[word] + '$', 'i');
            replace = word;
        }
        else {
            pattern = new RegExp(word + '$', 'i');
            replace = irregular[word];
        }
        if (pattern.test(s)) {
            return s.replace(pattern, replace);
        }
    }
    var array = (revert) ? singular : plural;
    for (var reg in array) {
        var pattern = new RegExp(reg, 'i');
        if (pattern.test(s)) {
            return s.replace(pattern, array[reg]);
        }
    }
    return s;
}
exports.pluralize = pluralize;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcGVzL3BsdXJhbC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxxQkFBcUQsZUFBZSxDQUFDLENBQUE7QUFHckU7SUFBQTtJQVNBLENBQUM7SUFSRyw4QkFBUyxHQUFULFVBQVUsS0FBYSxFQUFFLElBQWU7UUFDcEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUM7SUFUTDtRQUFDLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDOztrQkFBQTtJQVV2QyxpQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksa0JBQVUsYUFTdEIsQ0FBQTtBQUVELG1CQUEwQixDQUFTLEVBQUUsTUFBdUI7SUFBdkIsc0JBQXVCLEdBQXZCLGNBQXVCO0lBQ3hELElBQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFpQixPQUFPO1FBQ2pDLFFBQVEsRUFBa0IsTUFBTTtRQUNoQyxjQUFjLEVBQVksT0FBTztRQUNqQyx1QkFBdUIsRUFBRyxRQUFRO1FBQ2xDLGVBQWUsRUFBVyxNQUFNO1FBQ2hDLGtCQUFrQixFQUFRLE9BQU87UUFDakMsU0FBUyxFQUFpQixLQUFLO1FBQy9CLHVCQUF1QixFQUFHLFNBQVM7UUFDbkMsdUJBQXVCLEVBQUcsT0FBTztRQUNqQyxNQUFNLEVBQW9CLEtBQUs7UUFDL0IsV0FBVyxFQUFlLEtBQUs7UUFDL0IsNkJBQTZCLEVBQUUsT0FBTztRQUN0QyxRQUFRLEVBQWtCLE9BQU87UUFDakMsVUFBVSxFQUFnQixNQUFNO1FBQ2hDLFlBQVksRUFBYyxLQUFLO1FBQy9CLGNBQWMsRUFBWSxNQUFNO1FBQ2hDLE9BQU8sRUFBbUIsTUFBTTtRQUNoQyxVQUFVLEVBQWdCLEtBQUs7S0FDbEMsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHO1FBQ2IsWUFBWSxFQUFlLElBQUk7UUFDL0IsYUFBYSxFQUFjLE1BQU07UUFDakMsaUJBQWlCLEVBQVUsTUFBTTtRQUNqQyxVQUFVLEVBQWlCLElBQUk7UUFDL0IsWUFBWSxFQUFlLElBQUk7UUFDL0IsZUFBZSxFQUFZLE1BQU07UUFDakMsbUJBQW1CLEVBQVEsTUFBTTtRQUNqQyxVQUFVLEVBQWlCLElBQUk7UUFDL0IsUUFBUSxFQUFtQixJQUFJO1FBQy9CLFVBQVUsRUFBaUIsSUFBSTtRQUMvQixhQUFhLEVBQWMsUUFBUTtRQUNuQyxpQkFBaUIsRUFBVSxJQUFJO1FBQy9CLFdBQVcsRUFBZ0IsUUFBUTtRQUNuQyxXQUFXLEVBQWdCLFNBQVM7UUFDcEMsb0JBQW9CLEVBQU8sS0FBSztRQUNoQyxZQUFZLEVBQWUsS0FBSztRQUNoQyxVQUFVLEVBQWlCLElBQUk7UUFDL0IsVUFBVSxFQUFpQixJQUFJO1FBQy9CLGlCQUFpQixFQUFVLE1BQU07UUFDakMseUJBQXlCLEVBQUUsS0FBSztRQUNoQyxjQUFjLEVBQWEsT0FBTztRQUNsQywrREFBK0QsRUFBRSxTQUFTO1FBQzFFLFVBQVUsRUFBaUIsTUFBTTtRQUNqQyxTQUFTLEVBQWtCLE9BQU87UUFDbEMsY0FBYyxFQUFhLFFBQVE7UUFDbkMsWUFBWSxFQUFlLElBQUk7UUFDL0IsU0FBUyxFQUFrQixJQUFJO1FBQy9CLElBQUksRUFBdUIsRUFBRTtLQUNoQyxDQUFDO0lBRUYsSUFBTSxTQUFTLEdBQUc7UUFDZCxNQUFNLEVBQUssT0FBTztRQUNsQixNQUFNLEVBQUssTUFBTTtRQUNqQixPQUFPLEVBQUksT0FBTztRQUNsQixLQUFLLEVBQU0sT0FBTztRQUNsQixPQUFPLEVBQUksVUFBVTtRQUNyQixLQUFLLEVBQU0sS0FBSztRQUNoQixPQUFPLEVBQUksT0FBTztRQUNsQixRQUFRLEVBQUcsUUFBUTtLQUN0QixDQUFDO0lBRUYsSUFBTSxXQUFXLEdBQUc7UUFDaEIsT0FBTztRQUNQLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFNBQVM7UUFDVCxPQUFPO1FBQ1AsTUFBTTtRQUNOLGFBQWE7UUFDYixXQUFXO0tBQ2QsQ0FBQztJQUdGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUdELEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxPQUFPLFNBQUEsQ0FBQztRQUNaLElBQUksT0FBTyxTQUFBLENBQUM7UUFFWixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0MsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwQyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFHekMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUM7QUEvR2UsaUJBQVMsWUErR3hCLENBQUEiLCJmaWxlIjoicGlwZXMvcGx1cmFsLXBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBTYWwgU2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gMi8xNS8xNi5cbiAqL1xuXG5pbXBvcnQge1BpcGUsIENoYW5nZURldGVjdG9yUmVmLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuQFBpcGUoe25hbWU6ICdwbHVyYWxpemUnLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgUGx1cmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmdzPzogc3RyaW5nW10pOiBhbnkge1xuICAgICAgICBsZXQgbnVtYmVyID0gcGFyc2VJbnQoYXJnc1swXSk7XG4gICAgICAgIGlmIChpc05hTihudW1iZXIpIHx8IG51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBsdXJhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVyYWxpemUoczogc3RyaW5nLCByZXZlcnQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgY29uc3QgcGx1cmFsID0ge1xuICAgICAgICAnKHF1aXopJCcgICAgICAgICAgICAgICA6IFwiJDF6ZXNcIixcbiAgICAgICAgJ14ob3gpJCcgICAgICAgICAgICAgICAgOiBcIiQxZW5cIixcbiAgICAgICAgJyhbbXxsXSlvdXNlJCcgICAgICAgICAgOiBcIiQxaWNlXCIsXG4gICAgICAgICcobWF0cnx2ZXJ0fGluZClpeHxleCQnIDogXCIkMWljZXNcIixcbiAgICAgICAgJyh4fGNofHNzfHNoKSQnICAgICAgICAgOiBcIiQxZXNcIixcbiAgICAgICAgJyhbXmFlaW91eV18cXUpeSQnICAgICAgOiBcIiQxaWVzXCIsXG4gICAgICAgICcoaGl2ZSkkJyAgICAgICAgICAgICAgIDogXCIkMXNcIixcbiAgICAgICAgJyg/OihbXmZdKWZlfChbbHJdKWYpJCcgOiBcIiQxJDJ2ZXNcIixcbiAgICAgICAgJyhzaGVhfGxlYXxsb2F8dGhpZSlmJCcgOiBcIiQxdmVzXCIsXG4gICAgICAgICdzaXMkJyAgICAgICAgICAgICAgICAgIDogXCJzZXNcIixcbiAgICAgICAgJyhbdGldKXVtJCcgICAgICAgICAgICAgOiBcIiQxYVwiLFxuICAgICAgICAnKHRvbWF0fHBvdGF0fGVjaHxoZXJ8dmV0KW8kJzogXCIkMW9lc1wiLFxuICAgICAgICAnKGJ1KXMkJyAgICAgICAgICAgICAgICA6IFwiJDFzZXNcIixcbiAgICAgICAgJyhhbGlhcykkJyAgICAgICAgICAgICAgOiBcIiQxZXNcIixcbiAgICAgICAgJyhvY3RvcCl1cyQnICAgICAgICAgICAgOiBcIiQxaVwiLFxuICAgICAgICAnKGF4fHRlc3QpaXMkJyAgICAgICAgICA6IFwiJDFlc1wiLFxuICAgICAgICAnKHVzKSQnICAgICAgICAgICAgICAgICA6IFwiJDFlc1wiLFxuICAgICAgICAnKFtec10rKSQnICAgICAgICAgICAgICA6IFwiJDFzXCJcbiAgICB9O1xuXG4gICAgY29uc3Qgc2luZ3VsYXIgPSB7XG4gICAgICAgICcocXVpeil6ZXMkJyAgICAgICAgICAgICA6IFwiJDFcIixcbiAgICAgICAgJyhtYXRyKWljZXMkJyAgICAgICAgICAgIDogXCIkMWl4XCIsXG4gICAgICAgICcodmVydHxpbmQpaWNlcyQnICAgICAgICA6IFwiJDFleFwiLFxuICAgICAgICAnXihveCllbiQnICAgICAgICAgICAgICAgOiBcIiQxXCIsXG4gICAgICAgICcoYWxpYXMpZXMkJyAgICAgICAgICAgICA6IFwiJDFcIixcbiAgICAgICAgJyhvY3RvcHx2aXIpaSQnICAgICAgICAgIDogXCIkMXVzXCIsXG4gICAgICAgICcoY3Jpc3xheHx0ZXN0KWVzJCcgICAgICA6IFwiJDFpc1wiLFxuICAgICAgICAnKHNob2UpcyQnICAgICAgICAgICAgICAgOiBcIiQxXCIsXG4gICAgICAgICcobyllcyQnICAgICAgICAgICAgICAgICA6IFwiJDFcIixcbiAgICAgICAgJyhidXMpZXMkJyAgICAgICAgICAgICAgIDogXCIkMVwiLFxuICAgICAgICAnKFttfGxdKWljZSQnICAgICAgICAgICAgOiBcIiQxb3VzZVwiLFxuICAgICAgICAnKHh8Y2h8c3N8c2gpZXMkJyAgICAgICAgOiBcIiQxXCIsXG4gICAgICAgICcobSlvdmllcyQnICAgICAgICAgICAgICA6IFwiJDFvdmllXCIsXG4gICAgICAgICcocyllcmllcyQnICAgICAgICAgICAgICA6IFwiJDFlcmllc1wiLFxuICAgICAgICAnKFteYWVpb3V5XXxxdSlpZXMkJyAgICAgOiBcIiQxeVwiLFxuICAgICAgICAnKFtscl0pdmVzJCcgICAgICAgICAgICAgOiBcIiQxZlwiLFxuICAgICAgICAnKHRpdmUpcyQnICAgICAgICAgICAgICAgOiBcIiQxXCIsXG4gICAgICAgICcoaGl2ZSlzJCcgICAgICAgICAgICAgICA6IFwiJDFcIixcbiAgICAgICAgJyhsaXx3aXxrbmkpdmVzJCcgICAgICAgIDogXCIkMWZlXCIsXG4gICAgICAgICcoc2hlYXxsb2F8bGVhfHRoaWUpdmVzJCc6IFwiJDFmXCIsXG4gICAgICAgICcoXmFuYWx5KXNlcyQnICAgICAgICAgICA6IFwiJDFzaXNcIixcbiAgICAgICAgJygoYSluYWx5fChiKWF8KGQpaWFnbm98KHApYXJlbnRoZXwocClyb2dub3wocyl5bm9wfCh0KWhlKXNlcyQnOiBcIiQxJDJzaXNcIixcbiAgICAgICAgJyhbdGldKWEkJyAgICAgICAgICAgICAgIDogXCIkMXVtXCIsXG4gICAgICAgICcobilld3MkJyAgICAgICAgICAgICAgICA6IFwiJDFld3NcIixcbiAgICAgICAgJyhofGJsKW91c2VzJCcgICAgICAgICAgIDogXCIkMW91c2VcIixcbiAgICAgICAgJyhjb3Jwc2UpcyQnICAgICAgICAgICAgIDogXCIkMVwiLFxuICAgICAgICAnKHVzKWVzJCcgICAgICAgICAgICAgICAgOiBcIiQxXCIsXG4gICAgICAgICdzJCcgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICB9O1xuXG4gICAgY29uc3QgaXJyZWd1bGFyID0ge1xuICAgICAgICAnbW92ZScgICA6ICdtb3ZlcycsXG4gICAgICAgICdmb290JyAgIDogJ2ZlZXQnLFxuICAgICAgICAnZ29vc2UnICA6ICdnZWVzZScsXG4gICAgICAgICdzZXgnICAgIDogJ3NleGVzJyxcbiAgICAgICAgJ2NoaWxkJyAgOiAnY2hpbGRyZW4nLFxuICAgICAgICAnbWFuJyAgICA6ICdtZW4nLFxuICAgICAgICAndG9vdGgnICA6ICd0ZWV0aCcsXG4gICAgICAgICdwZXJzb24nIDogJ3Blb3BsZSdcbiAgICB9O1xuXG4gICAgY29uc3QgdW5jb3VudGFibGUgPSBbXG4gICAgICAgICdzaGVlcCcsXG4gICAgICAgICdmaXNoJyxcbiAgICAgICAgJ2RlZXInLFxuICAgICAgICAnc2VyaWVzJyxcbiAgICAgICAgJ3NwZWNpZXMnLFxuICAgICAgICAnbW9uZXknLFxuICAgICAgICAncmljZScsXG4gICAgICAgICdpbmZvcm1hdGlvbicsXG4gICAgICAgICdlcXVpcG1lbnQnXG4gICAgXTtcblxuICAgIC8vIHNhdmUgc29tZSB0aW1lIGluIHRoZSBjYXNlIHRoYXQgc2luZ3VsYXIgYW5kIHBsdXJhbCBhcmUgdGhlIHNhbWVcbiAgICBpZiAodW5jb3VudGFibGUuaW5kZXhPZihzLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZm9yIGlycmVndWxhciBmb3Jtc1xuICAgIGZvciAobGV0IHdvcmQgaW4gaXJyZWd1bGFyKSB7XG4gICAgICAgIGxldCBwYXR0ZXJuO1xuICAgICAgICBsZXQgcmVwbGFjZTtcblxuICAgICAgICBpZiAocmV2ZXJ0KSB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChpcnJlZ3VsYXJbd29yZF0rJyQnLCAnaScpO1xuICAgICAgICAgICAgcmVwbGFjZSA9IHdvcmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cCh3b3JkKyckJywgJ2knKTtcbiAgICAgICAgICAgIHJlcGxhY2UgPSBpcnJlZ3VsYXJbd29yZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHBhdHRlcm4sIHJlcGxhY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFycmF5ID0gKHJldmVydCkgPyBzaW5ndWxhciA6IHBsdXJhbDtcblxuICAgIC8vIGNoZWNrIGZvciBtYXRjaGVzIHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBmb3IgKGxldCByZWcgaW4gYXJyYXkpIHtcbiAgICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKHJlZywgJ2knKTtcblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKHBhdHRlcm4sIGFycmF5W3JlZ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHM7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=