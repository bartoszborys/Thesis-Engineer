-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.3.9-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Zrzut struktury bazy danych data__bborys
CREATE DATABASE IF NOT EXISTS `data__bborys` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci */;
USE `data__bborys`;

-- Zrzut struktury tabela data__bborys.globalmessages
CREATE TABLE IF NOT EXISTS `globalmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` tinytext CHARACTER SET latin1 NOT NULL,
  `message` text CHARACTER SET latin1 NOT NULL,
  `type_id` char(4) CHARACTER SET latin1 NOT NULL,
  `sender_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_globalmessages_globalmessagestypes` (`type_id`),
  KEY `FK_globalmessages_users` (`sender_id`),
  CONSTRAINT `FK_globalmessages_globalmessagestypes` FOREIGN KEY (`type_id`) REFERENCES `globalmessagestypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_globalmessages_users` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.globalmessages: ~2 rows (około)
/*!40000 ALTER TABLE `globalmessages` DISABLE KEYS */;
INSERT IGNORE INTO `globalmessages` (`id`, `header`, `message`, `type_id`, `sender_id`) VALUES
	(10, 'Witam', 'Nooo', 'crit', 77),
	(11, 'Witam', 'Witam pana2', 'impo', 77);
/*!40000 ALTER TABLE `globalmessages` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.globalmessagestypes
CREATE TABLE IF NOT EXISTS `globalmessagestypes` (
  `id` char(4) CHARACTER SET latin1 NOT NULL,
  `name` tinytext CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.globalmessagestypes: ~2 rows (około)
/*!40000 ALTER TABLE `globalmessagestypes` DISABLE KEYS */;
INSERT IGNORE INTO `globalmessagestypes` (`id`, `name`) VALUES
	('crit', 'Krytyczne'),
	('impo', 'Wazne'),
	('info', 'Informacja');
/*!40000 ALTER TABLE `globalmessagestypes` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `sender_id` int(11) NOT NULL,
  `reciver_id` int(11) NOT NULL,
  `message` text COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_messages_users_sender` (`sender_id`),
  KEY `FK_messages_users_reciver` (`reciver_id`),
  CONSTRAINT `FK_messages_users_reciver` FOREIGN KEY (`reciver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_messages_users_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.messages: ~220 rows (około)
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT IGNORE INTO `messages` (`id`, `date`, `sender_id`, `reciver_id`, `message`) VALUES
	(2, '2018-10-24 07:29:16', 1, 2, 'Hello world!'),
	(3, '2018-10-24 14:11:56', 1, 2, 'Test'),
	(4, '2018-10-26 18:03:01', 76, 2, 'monikok696@student.polsl.pl'),
	(5, '2018-10-26 18:03:12', 76, 2, 'Ale z ciebie dupa'),
	(6, '2018-10-27 16:50:15', 2, 2, 'Test'),
	(7, '2018-10-28 21:52:20', 76, 77, 'Witam pana :)'),
	(8, '2018-10-24 07:29:16', 1, 2, 'annyonghaseyo'),
	(9, '2018-10-28 21:52:20', 2, 77, 'Czy ma pan prace?'),
	(10, '2018-10-28 21:52:20', 79, 77, 'Pan da 3'),
	(11, '2018-11-01 16:18:50', 77, 2, 'asdasd'),
	(12, '2018-11-01 16:19:00', 77, 2, 'Chyba nie mam niestety\n'),
	(13, '2018-11-01 16:19:06', 77, 2, 'A czemu pan pyta?\n'),
	(14, '2018-11-01 16:35:21', 2, 77, 'A no bo tak sobie pytam'),
	(15, '2018-11-01 16:36:32', 77, 2, 'Okej'),
	(16, '2018-11-01 16:37:36', 2, 77, 'Rozumiem\n'),
	(17, '2018-11-01 16:38:26', 77, 2, 'adsa'),
	(18, '2018-11-01 16:38:53', 77, 2, 'sda'),
	(19, '2018-11-01 16:38:59', 77, 2, 'asd'),
	(20, '2018-11-01 16:39:03', 2, 77, 'aha'),
	(21, '2018-11-01 16:39:06', 77, 2, 'ada'),
	(22, '2018-11-01 16:39:08', 77, 2, 'asdsad'),
	(23, '2018-11-01 16:39:09', 77, 2, 'asd'),
	(24, '2018-11-01 16:39:10', 2, 77, 'asdasd'),
	(25, '2018-11-01 16:39:11', 2, 77, 'asd'),
	(26, '2018-11-01 16:39:27', 2, 77, 'mam na imie bartus\n'),
	(27, '2018-11-01 16:39:30', 77, 2, 'a ty'),
	(28, '2018-11-01 16:39:33', 2, 77, 'a nie wiem'),
	(29, '2018-11-01 16:39:36', 77, 2, 'a ci'),
	(30, '2018-11-01 16:39:38', 77, 2, 'asd'),
	(31, '2018-11-01 16:39:40', 77, 2, 'aha'),
	(32, '2018-11-01 16:39:46', 2, 77, 'ej nie wiem czemy sie wiadomosci nie wysylaja czasem\n'),
	(33, '2018-11-01 16:39:49', 77, 2, 'No ja tez\n'),
	(34, '2018-11-01 18:06:53', 77, 2, 'Co tam\n'),
	(35, '2018-11-01 18:10:04', 77, 2, 'Test\n'),
	(36, '2018-11-01 18:15:36', 77, 2, 'Damn\n'),
	(37, '2018-11-01 18:17:13', 77, 2, 'Test\n'),
	(38, '2018-11-01 18:20:43', 77, 2, 'test\n'),
	(39, '2018-11-01 18:30:47', 77, 2, 'aaa\n'),
	(40, '2018-11-01 18:32:31', 77, 2, 'a\n'),
	(41, '2018-11-01 18:32:32', 77, 2, 'asd\n'),
	(42, '2018-11-01 18:32:38', 77, 2, 'rotfl\n'),
	(43, '2018-11-01 18:32:41', 77, 2, 'sadasd?\n'),
	(44, '2018-11-01 18:32:41', 77, 2, 'as\nd'),
	(45, '2018-11-01 18:32:41', 77, 2, 'a\ns'),
	(46, '2018-11-01 18:32:41', 77, 2, 'd\na'),
	(47, '2018-11-01 18:32:41', 77, 2, 'sd\n'),
	(48, '2018-11-01 18:32:42', 77, 2, 'a\ns'),
	(49, '2018-11-01 18:32:42', 77, 2, 'd\n'),
	(50, '2018-11-01 18:37:23', 77, 2, 'sad\n'),
	(51, '2018-11-01 18:37:47', 77, 2, 'SAD'),
	(52, '2018-11-01 18:40:19', 77, 2, 'sad\n'),
	(53, '2018-11-01 18:46:14', 77, 76, 's\n'),
	(54, '2018-11-02 20:13:14', 77, 2, 'Test\n'),
	(55, '2018-11-02 20:14:26', 77, 2, 's'),
	(56, '2018-11-02 20:15:34', 77, 2, 'A teraz?\n'),
	(57, '2018-11-02 20:16:10', 77, 2, 'dafuq\n'),
	(58, '2018-11-02 20:21:56', 77, 2, 'test'),
	(59, '2018-11-02 20:22:01', 77, 2, 'Testowo\n'),
	(60, '2018-11-02 20:25:17', 77, 2, 'sad\n'),
	(61, '2018-11-02 20:25:17', 77, 2, 'as\n'),
	(62, '2018-11-02 20:25:17', 77, 2, 's\nd'),
	(63, '2018-11-02 20:25:17', 77, 2, 'as\nd'),
	(64, '2018-11-02 20:25:17', 77, 2, 'd\n'),
	(65, '2018-11-02 20:25:18', 77, 2, 'd\n'),
	(66, '2018-11-02 20:25:18', 77, 2, '\nas'),
	(67, '2018-11-02 20:25:18', 77, 2, 'a\ns'),
	(68, '2018-11-02 20:25:18', 77, 2, 'd\n'),
	(69, '2018-11-02 20:25:18', 77, 2, 'as\n'),
	(70, '2018-11-02 20:25:19', 77, 2, 'a\ns'),
	(71, '2018-11-02 20:25:19', 77, 2, 'd\n'),
	(72, '2018-11-02 20:25:19', 77, 2, 'd\n'),
	(73, '2018-11-02 20:25:19', 77, 2, 'as\n'),
	(74, '2018-11-02 20:25:19', 77, 2, '\nas'),
	(75, '2018-11-02 20:25:20', 77, 2, 'as\nd'),
	(76, '2018-11-02 20:25:20', 77, 2, 'd\na'),
	(77, '2018-11-02 20:25:20', 77, 2, 'a\ns'),
	(78, '2018-11-02 20:25:20', 77, 2, '\nas'),
	(79, '2018-11-02 20:25:20', 77, 2, 'd\na'),
	(80, '2018-11-02 20:25:21', 77, 2, 'a\ns'),
	(81, '2018-11-02 20:25:21', 77, 2, 'as\nd'),
	(82, '2018-11-02 20:25:21', 77, 2, 'd\n'),
	(83, '2018-11-02 20:25:21', 77, 2, 'as\nd'),
	(84, '2018-11-02 20:25:21', 77, 2, 'd\n'),
	(85, '2018-11-02 20:25:21', 77, 2, 'd\n'),
	(86, '2018-11-02 20:25:21', 77, 2, 'd\n'),
	(87, '2018-11-02 20:25:21', 77, 2, '\n'),
	(88, '2018-11-02 20:25:22', 77, 2, 'as\nd'),
	(89, '2018-11-02 20:25:22', 77, 2, 's\nd'),
	(90, '2018-11-02 20:25:22', 77, 2, 'd\n'),
	(91, '2018-11-02 20:25:22', 77, 2, '\n'),
	(92, '2018-11-02 20:25:22', 77, 2, '\n'),
	(93, '2018-11-02 20:25:23', 77, 2, 'd\n'),
	(94, '2018-11-02 20:25:23', 77, 2, 'a\nsd'),
	(95, '2018-11-02 20:25:23', 77, 2, 's\nd'),
	(96, '2018-11-02 20:25:23', 77, 2, '\nas'),
	(97, '2018-11-02 20:25:23', 77, 2, 'd\n'),
	(98, '2018-11-02 20:25:24', 77, 2, 'as\nd'),
	(99, '2018-11-02 20:25:24', 77, 2, 'sd\n'),
	(100, '2018-11-02 20:25:24', 77, 2, 'as\n'),
	(101, '2018-11-02 20:25:24', 77, 2, 'as\n'),
	(102, '2018-11-02 20:25:24', 77, 2, 'as\nd'),
	(103, '2018-11-02 20:25:25', 77, 2, 'd\n'),
	(104, '2018-11-02 20:25:25', 77, 2, 'd\nas'),
	(105, '2018-11-02 20:25:25', 77, 2, 'as\nd'),
	(106, '2018-11-02 20:25:25', 77, 2, '\nas'),
	(107, '2018-11-02 20:25:25', 77, 2, 'd\n'),
	(108, '2018-11-02 20:25:26', 77, 2, 'd\n'),
	(109, '2018-11-02 20:25:26', 77, 2, 'as\nd'),
	(110, '2018-11-02 20:25:26', 77, 2, 'as\nd'),
	(111, '2018-11-02 20:25:26', 77, 2, 'sd\n'),
	(112, '2018-11-02 20:25:26', 77, 2, '\nas'),
	(113, '2018-11-02 20:25:26', 77, 2, 'd\n'),
	(114, '2018-11-02 20:25:26', 77, 2, '\na'),
	(115, '2018-11-02 20:25:26', 77, 2, 'asd\na'),
	(116, '2018-11-02 20:25:27', 77, 2, 'asd\n'),
	(117, '2018-11-02 20:25:27', 77, 2, '\nas'),
	(118, '2018-11-02 20:25:27', 77, 2, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'),
	(119, '2018-11-02 20:25:27', 77, 2, '\na'),
	(120, '2018-11-02 20:25:28', 77, 2, '\nd'),
	(121, '2018-11-02 20:25:28', 77, 2, '\nas'),
	(122, '2018-11-02 20:25:28', 77, 2, 'dd\n'),
	(123, '2018-11-02 20:25:28', 77, 2, 'as\nd'),
	(124, '2018-11-02 20:25:28', 77, 2, '\n'),
	(125, '2018-11-02 20:26:23', 2, 77, 'Co tam\n'),
	(126, '2018-11-02 20:26:44', 77, 2, 'A nic jak tam u ciebie\n'),
	(127, '2018-11-03 10:03:30', 77, 2, 'Elo\n'),
	(128, '2018-11-03 11:03:24', 2, 77, 'test'),
	(129, '2018-11-03 11:03:34', 2, 77, 'Co tam misiek\n'),
	(138, '2018-11-04 20:06:37', 2, 77, '12'),
	(139, '2018-11-04 20:06:46', 77, 2, '12'),
	(140, '2018-11-04 20:06:51', 77, 2, '12'),
	(141, '2018-11-04 20:06:52', 2, 77, 'sad'),
	(142, '2018-11-04 20:06:55', 2, 77, 'asd'),
	(143, '2018-11-04 20:07:02', 2, 77, 'asd'),
	(144, '2018-11-04 20:07:06', 2, 77, 'asd'),
	(145, '2018-11-04 20:07:29', 2, 77, 'Witam\n'),
	(146, '2018-11-04 20:07:37', 2, 77, 'xD'),
	(147, '2018-11-04 20:07:41', 2, 77, 'xD'),
	(148, '2018-11-04 20:07:44', 2, 77, 'Co tam\n'),
	(149, '2018-11-04 20:07:46', 77, 2, 'A nic xD\n'),
	(150, '2018-11-04 20:07:50', 2, 77, 'Hehe monika xD\n'),
	(151, '2018-11-04 20:07:53', 77, 2, 'Nom fajno\n'),
	(152, '2018-11-04 20:08:46', 77, 76, 'Co tam\n'),
	(153, '2018-11-04 20:08:50', 77, 76, 'asd'),
	(154, '2018-11-05 17:28:56', 77, 2, 'Hej\n'),
	(155, '2018-11-05 17:29:00', 2, 77, 'No siema co tam\n'),
	(156, '2018-11-05 17:29:03', 77, 2, 'a nic no\n'),
	(157, '2018-11-05 17:29:04', 2, 77, 'Aha\n'),
	(158, '2018-11-05 17:29:07', 77, 2, 'okej\n'),
	(159, '2018-11-05 17:29:09', 77, 2, ':D\n'),
	(160, '2018-11-05 17:29:12', 2, 77, 'this.getConversationPath\n'),
	(161, '2018-11-05 17:29:26', 2, 77, '<script>alert(\'hello world\')</script>\n'),
	(162, '2018-11-05 19:03:55', 77, 2, 'Hejka\n'),
	(163, '2018-11-05 19:04:03', 2, 77, 'Hej, \nCo tam porabiasz'),
	(164, '2018-11-05 19:13:38', 77, 2, 'co\n'),
	(165, '2018-11-05 19:14:27', 77, 2, 'sd\n'),
	(166, '2018-11-05 19:14:29', 77, 2, 'asd\n'),
	(167, '2018-11-05 19:14:50', 77, 2, 'asdd\n'),
	(168, '2018-11-05 19:15:06', 77, 2, 'asd\n'),
	(169, '2018-11-05 19:15:26', 77, 2, 'asd\n'),
	(170, '2018-11-05 19:15:35', 77, 2, 'asd\n'),
	(171, '2018-11-05 19:15:42', 77, 2, 'test\n'),
	(172, '2018-11-07 08:23:59', 1, 1, 'asd\n'),
	(173, '2018-11-07 08:24:08', 1, 1, 'Co tam panie psorze \n'),
	(174, '2018-11-07 08:24:09', 1, 1, ':D\n'),
	(175, '2018-11-07 10:22:02', 77, 2, 'Hej\n'),
	(176, '2018-11-07 10:22:27', 2, 77, 'asd\n'),
	(177, '2018-11-07 10:22:54', 2, 77, 'asd\n'),
	(178, '2018-11-07 10:24:08', 77, 2, 'j\n'),
	(179, '2018-11-07 10:25:48', 77, 2, 'S\n'),
	(180, '2018-11-07 10:26:03', 77, 2, 'tEST\n'),
	(181, '2018-11-07 10:26:12', 77, 2, 'Error\n'),
	(182, '2018-11-07 10:26:16', 2, 77, 'Witam\n'),
	(183, '2018-11-07 10:26:21', 77, 2, 'Raz\n'),
	(184, '2018-11-07 10:26:24', 2, 77, 'dwa\n'),
	(185, '2018-11-07 10:37:19', 77, 2, 's\n'),
	(186, '2018-11-07 10:37:24', 77, 2, 'czesc\n'),
	(187, '2018-11-07 10:37:32', 77, 2, 'polskie znaki nie dzialajo\n'),
	(188, '2018-11-07 10:37:38', 77, 2, '\n'),
	(189, '2018-11-07 10:37:38', 77, 2, 'polskie znakaias sad as das asd \n'),
	(190, '2018-11-07 10:37:39', 77, 2, 'polskie znakaias sad as das asd \n'),
	(191, '2018-11-07 10:37:40', 77, 2, 'polskie znakaias sad as das asd \n'),
	(192, '2018-11-07 10:37:40', 77, 2, 'polskie znakaias sad as das asd \n'),
	(193, '2018-11-07 10:37:40', 77, 2, 'polskie znakaias sad as das asd \n'),
	(194, '2018-11-07 10:37:41', 77, 2, 'polskie znakaias sad as das asd \n'),
	(195, '2018-11-07 10:37:41', 77, 2, 'polskie znakaias sad as das asd \n'),
	(196, '2018-11-07 10:37:42', 77, 2, 'polskie znakaias sad as das asd \n'),
	(197, '2018-11-07 10:37:42', 77, 2, 'polskie znakaias sad as das asd \n'),
	(198, '2018-11-07 10:37:42', 77, 2, 'polskie znakaias sad as das asd \npolskie znakaias sad as das asd '),
	(199, '2018-11-07 10:37:42', 77, 2, '\n'),
	(200, '2018-11-07 10:37:48', 77, 2, 'Test\n'),
	(201, '2018-11-07 10:41:08', 2, 77, 'Czesc\n'),
	(202, '2018-11-07 10:41:10', 2, 77, 'elo\n'),
	(203, '2018-11-07 10:41:14', 77, 2, 'co tam\n'),
	(204, '2018-11-07 10:42:30', 77, 2, 'xD\n'),
	(205, '2018-11-07 10:45:07', 77, 2, 'xD\n'),
	(206, '2018-11-07 14:28:12', 77, 2, 'test\n'),
	(207, '2018-11-09 10:23:01', 1, 77, 'asd\n'),
	(208, '2018-11-09 10:23:06', 1, 77, 'czesc\n'),
	(209, '2018-11-09 10:23:08', 77, 2, 'asd\n'),
	(210, '2018-11-09 10:23:09', 77, 2, 'asd\n'),
	(211, '2018-11-09 10:23:09', 77, 2, '\n'),
	(212, '2018-11-09 10:25:04', 1, 77, 'd\n'),
	(213, '2018-11-16 09:18:56', 77, 2, 'Hej\n'),
	(214, '2018-11-16 09:20:11', 2, 77, '\n'),
	(215, '2018-11-16 09:20:12', 2, 77, '\n'),
	(216, '2018-11-16 09:20:13', 2, 77, '\n'),
	(217, '2018-11-16 09:20:37', 2, 77, '\n'),
	(218, '2018-11-16 09:20:38', 2, 77, 'xD\n'),
	(219, '2018-11-16 09:20:39', 2, 77, 'xD\n'),
	(220, '2018-11-16 09:20:40', 2, 77, 'xD\n'),
	(221, '2018-11-16 09:20:40', 2, 77, 's\n'),
	(222, '2018-11-16 09:20:41', 2, 77, '\n'),
	(223, '2018-11-16 09:20:41', 2, 77, '\n'),
	(224, '2018-11-16 09:20:41', 2, 77, '\n'),
	(225, '2018-11-16 09:20:41', 2, 77, '\n'),
	(226, '2018-11-17 07:36:20', 77, 2, 'Co tam\n'),
	(227, '2018-11-17 07:36:22', 2, 77, 'A nic a tam\n'),
	(228, '2018-11-24 16:32:37', 77, 2, 'Nicp\n'),
	(229, '2018-11-24 16:32:43', 77, 2, 'Nicpon!\n'),
	(230, '2018-11-28 10:10:20', 77, 2, 'Jesteś no\n'),
	(231, '2018-11-28 10:10:25', 2, 77, 'elo\n'),
	(232, '2018-11-28 10:11:10', 77, 2, 'xD\n'),
	(233, '2018-11-28 10:29:46', 77, 2, 'witam\n'),
	(234, '2018-11-28 10:29:49', 2, 77, 'Co tam\n'),
	(235, '2018-11-28 11:21:29', 2, 77, 'Ale bajer\n'),
	(236, '2018-11-28 11:21:36', 77, 2, 'No mówię ci stary :D\n'),
	(237, '2018-11-28 11:47:48', 77, 2, 'Ble\n'),
	(238, '2018-11-28 11:48:11', 77, 2, 'elo\n'),
	(239, '2018-11-28 11:48:52', 2, 77, 'elo\n'),
	(240, '2018-11-28 11:50:22', 2, 77, 'asd\n'),
	(241, '2018-11-28 11:50:26', 77, 2, 'sad\n'),
	(242, '2018-11-28 17:42:18', 2, 77, 'xD\n'),
	(243, '2018-11-28 17:42:20', 77, 2, 'Elo\n');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.passwords
CREATE TABLE IF NOT EXISTS `passwords` (
  `safetySalt` char(64) CHARACTER SET latin1 NOT NULL,
  `sensitivePassword` varchar(256) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`safetySalt`),
  UNIQUE KEY `sensitivePassword` (`sensitivePassword`),
  UNIQUE KEY `safetySalt` (`safetySalt`),
  CONSTRAINT `safetySalt` FOREIGN KEY (`safetySalt`) REFERENCES `users` (`safetySalt`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `safetySalt` CHECK (octet_length(`safetySalt`) = 64)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.passwords: ~8 rows (około)
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT IGNORE INTO `passwords` (`safetySalt`, `sensitivePassword`) VALUES
	('XhUp7nzV9n9jlTt15a67HQSHT0OXJpW20jWTpj3Lonxd2ZSXt9frQhGuA2qbjF2O', '$s2$16384$8$1$AaR276cebUuG+wYz8LEuAXEJIIRVAvryFr/1v+vnctM=$AmtTw073eN9EFRsW8bVeX/ngR7JCgbg4csHXGXKHlPk='),
	('n7Ociu9jFpFgpGLOzX5stUilHjks0nlhDG3YlgG16YG0hItYR8NO1JEUuxrNEuNp', '$s2$16384$8$1$dZucqcA6dz8d1A5zIXf8y3IgGQZmQYFW4yDuaMvYGYc=$rufkXDupo3TuKtuwO+LEFqc20PAYQRP9neWsPs0lHCk='),
	('3eG5P3pY1tcrKavfWKzxtpdHINLUF8wBFDEPFUYbCArBly5uzDlQ0UC4VYq4PJHW', '$s2$16384$8$1$GBan1h40PGKXoLivlkjaMFdjQxZgSDCPel3rof+SDbc=$xSCd6MP/L139cOX7V0A1WKXrjaz5YrrZaUYCLh9pEWU='),
	('eZfESh1bM0O61HGli77fzVjUcPUZc20ZZvRJDRxjSEWtfDNA8XFzxk46kFGohFEW', '$s2$16384$8$1$iXlbSJWFXsuaMXKuZcV+iZpAffa2WqHsyCsMaargVc4=$6OdN45MEP1JErReqo1YeaIynkv+D6NnaeTiAFOKlAic='),
	('LvYdiWiXGqFXlnZPlNXyjV26WnqcMPl2oQlGUv5awRZeKrCRBEsflv4G26yfpTOi', '$s2$16384$8$1$KqFbrW4Y/a4lQRVgcqJ5RMtw/9T0kVGotPaOCYnlgfg=$A1igu6BTS1wA6tZiMRyAWcTjtjuZDL6JdvvqBEZx9v8='),
	('2VbmdsFmCHUN9fgcDhUMEK6FbkhWc75IUOgHfnncI3OOOqgbwct0NsQjBcWMvGtg', '$s2$16384$8$1$NYp1SLc/7h4Jq/Mh07vAoZGugdELtCMWWFf8MygX+2E=$ZTVRR9SU5KZ4yhzx1p0fleh1qMZH3UlzuiDQueV0cDE='),
	('UvYsp4nJ4fat6UvqeFJ7gkuf8p06NDP9h1bs9xFbaYCiqy2WdmDK6wQCcGYeYoLZ', '$s2$16384$8$1$r6975iU0SUirzSaIJJV/U9mKdohDFE+m4F/zbIiShcg=$+atjTPX8cPCf6s83F9jXv3fQz0YkKxQnkrz0aBJ8DR4='),
	('b3DJGUCEwtX0mRQejhMhFJxqrwAObTGg95ek3Up4HQs2s8Y9jp1jj7px0TKlZQ2R', '$s2$16384$8$1$RBndW3MaHIVtYhKAp+rvP/rgCMCnwdzym7792as6InM=$LyBW8PyBqrdF6IZBwaKZ6RyeNUz7dQueyltPtZ27oVs='),
	('pxKHLJVNG92g3RrMsNXEqtMBfle8ES4w11Fk52WwFX0dB8XFTnnEru0n8Bd6AOcP', '$s2$16384$8$1$xNEPDxgf51e0O3JYEs5clTbJeG+CIyGevjbIr92QZ80=$9VMLiI32+Bsx8KWfc0zb1xQoTAXp0gvgimRjMrn0wmA=');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` char(3) CHARACTER SET latin1 NOT NULL,
  `name` varchar(128) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.roles: ~2 rows (około)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT IGNORE INTO `roles` (`id`, `name`) VALUES
	('GRD', 'Graduate'),
	('PRO', 'Promote');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.studyfields
CREATE TABLE IF NOT EXISTS `studyfields` (
  `id` char(50) CHARACTER SET latin1 NOT NULL,
  `name` char(128) COLLATE utf8_polish_ci NOT NULL,
  `faculty` char(50) COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.studyfields: ~3 rows (około)
/*!40000 ALTER TABLE `studyfields` DISABLE KEYS */;
INSERT IGNORE INTO `studyfields` (`id`, `name`, `faculty`) VALUES
	('aei_aut', 'Automatyka', 'AEiI'),
	('aei_ele', 'Elektronika', 'AEiI'),
	('aei_inf', 'Informatyka', 'AEiI');
/*!40000 ALTER TABLE `studyfields` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.thesis
CREATE TABLE IF NOT EXISTS `thesis` (
  `graduate_id` int(11) NOT NULL,
  `promoter_id` int(11) DEFAULT NULL,
  `state_id` char(3) CHARACTER SET latin1 NOT NULL,
  `last_action` datetime NOT NULL,
  `final_grade` float DEFAULT NULL,
  `thesis_grade` float NOT NULL DEFAULT 0,
  `study_grade` float NOT NULL DEFAULT 0,
  `defense_grade` float NOT NULL DEFAULT 0,
  `graduate_file` char(1) COLLATE utf8_polish_ci DEFAULT '0',
  `promoter_file` char(1) COLLATE utf8_polish_ci DEFAULT '0',
  PRIMARY KEY (`graduate_id`),
  KEY `FK_thesis_thesis_states` (`state_id`),
  KEY `FK_thesis_users_2` (`promoter_id`),
  CONSTRAINT `FK_thesis_thesis_states` FOREIGN KEY (`state_id`) REFERENCES `thesis_states` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_thesis_users` FOREIGN KEY (`graduate_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_thesis_users_2` FOREIGN KEY (`promoter_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.thesis: ~4 rows (około)
/*!40000 ALTER TABLE `thesis` DISABLE KEYS */;
INSERT IGNORE INTO `thesis` (`graduate_id`, `promoter_id`, `state_id`, `last_action`, `final_grade`, `thesis_grade`, `study_grade`, `defense_grade`, `graduate_file`, `promoter_file`) VALUES
	(2, 77, 'CHK', '2018-12-03 23:06:26', NULL, 5, 4, 5, '0', '0'),
	(76, 77, 'REJ', '2018-12-03 22:59:39', NULL, 3, 3.5, 4, '0', '0'),
	(79, 77, 'REJ', '2018-12-03 22:59:36', NULL, 0, 0, 0, '0', '0'),
	(82, 77, 'ACC', '2018-12-04 17:18:16', NULL, 3.5, 4.5, 4.5, '0', '0');
/*!40000 ALTER TABLE `thesis` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.thesis_comments
CREATE TABLE IF NOT EXISTS `thesis_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `graduate_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `message` text COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_thesis_comments_thesis` (`graduate_id`),
  KEY `FK_thesis_comments_users` (`sender_id`),
  CONSTRAINT `FK_thesis_comments_thesis` FOREIGN KEY (`graduate_id`) REFERENCES `thesis` (`graduate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_thesis_comments_users` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.thesis_comments: ~1 rows (około)
/*!40000 ALTER TABLE `thesis_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `thesis_comments` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.thesis_states
CREATE TABLE IF NOT EXISTS `thesis_states` (
  `id` char(3) CHARACTER SET latin1 NOT NULL,
  `name` tinytext COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.thesis_states: ~4 rows (około)
/*!40000 ALTER TABLE `thesis_states` DISABLE KEYS */;
INSERT IGNORE INTO `thesis_states` (`id`, `name`) VALUES
	('ACC', 'Zaakceptowana '),
	('BEG', 'Rozpoczęta'),
	('CHK', 'Sprawdzana'),
	('REJ', 'Odrzucona');
/*!40000 ALTER TABLE `thesis_states` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.userdetails
CREATE TABLE IF NOT EXISTS `userdetails` (
  `userId` int(11) NOT NULL,
  `name` varchar(128) CHARACTER SET latin1 DEFAULT NULL,
  `studyFieldId` char(50) CHARACTER SET latin1 DEFAULT NULL,
  `lastName` varchar(128) CHARACTER SET latin1 DEFAULT NULL,
  `role` char(3) CHARACTER SET latin1 NOT NULL,
  `engineerWork` varchar(128) CHARACTER SET latin1 DEFAULT NULL,
  `promoterId` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `FK_userdetails_promoter` (`promoterId`),
  KEY `FK_userdetails_roles` (`role`),
  KEY `FK_userdetails_studyfields` (`studyFieldId`),
  CONSTRAINT `FK_userdetails_promoter` FOREIGN KEY (`promoterId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_userdetails_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_userdetails_studyfields` FOREIGN KEY (`studyFieldId`) REFERENCES `studyfields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_userdetails_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.userdetails: ~9 rows (około)
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT IGNORE INTO `userdetails` (`userId`, `name`, `studyFieldId`, `lastName`, `role`, `engineerWork`, `promoterId`) VALUES
	(1, 'Bartoszek2', 'aei_ele', 'Borysek', 'GRD', 'Praca dyplomowa która jest ciekawa i gotowa odrazu :D TEST', 77),
	(2, 'Bartosz', 'aei_aut', 'Borys', 'GRD', 'Bardzo ciekawa i odpowiedzialna praca dyplomowa :)', 77),
	(76, 'Monika', NULL, 'Kokot', 'GRD', 'Fajna apka', 77),
	(77, 'Bartosz', NULL, 'Borys', 'PRO', NULL, NULL),
	(78, NULL, NULL, NULL, 'PRO', NULL, NULL),
	(79, 'Adam', NULL, 'Kowalski', 'GRD', 'Smieszna Apka', 77),
	(80, NULL, NULL, NULL, 'PRO', NULL, NULL),
	(81, 'Krystian', 'aei_inf', 'Kowalski', 'GRD', 'Testowa farma gnoju', 77),
	(82, 'Krzysztof', 'aei_inf', 'Borowski', 'GRD', 'Fajna praca', 77);
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;

-- Zrzut struktury tabela data__bborys.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) CHARACTER SET latin1 NOT NULL,
  `safetySalt` char(64) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`email`),
  UNIQUE KEY `safetySalt` (`safetySalt`),
  CONSTRAINT `safetySalt` CHECK (octet_length(`safetySalt`) = 64)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- Zrzucanie danych dla tabeli data__bborys.users: ~6 rows (około)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `email`, `safetySalt`) VALUES
	(1, 'barbor862@student.polsl.pl', '2VbmdsFmCHUN9fgcDhUMEK6FbkhWc75IUOgHfnncI3OOOqgbwct0NsQjBcWMvGtg'),
	(2, 'barbor863@student.polsl.pl', 'UvYsp4nJ4fat6UvqeFJ7gkuf8p06NDP9h1bs9xFbaYCiqy2WdmDK6wQCcGYeYoLZ'),
	(76, 'monikok696@student.polsl.pl', 'eZfESh1bM0O61HGli77fzVjUcPUZc20ZZvRJDRxjSEWtfDNA8XFzxk46kFGohFEW'),
	(77, 'Bartosz.Borys@polsl.pl', 'n7Ociu9jFpFgpGLOzX5stUilHjks0nlhDG3YlgG16YG0hItYR8NO1JEUuxrNEuNp'),
	(78, 'Monika.Kokot@polsl.pl', 'b3DJGUCEwtX0mRQejhMhFJxqrwAObTGg95ek3Up4HQs2s8Y9jp1jj7px0TKlZQ2R'),
	(79, 'adakow@student.polsl.pl', 'pxKHLJVNG92g3RrMsNXEqtMBfle8ES4w11Fk52WwFX0dB8XFTnnEru0n8Bd6AOcP'),
	(80, 'Bartosz.Borsy@polsl.pl', 'LvYdiWiXGqFXlnZPlNXyjV26WnqcMPl2oQlGUv5awRZeKrCRBEsflv4G26yfpTOi'),
	(81, 'krykow@student.polsl.pl', '3eG5P3pY1tcrKavfWKzxtpdHINLUF8wBFDEPFUYbCArBly5uzDlQ0UC4VYq4PJHW'),
	(82, 'krzbor@student.polsl.pl', 'XhUp7nzV9n9jlTt15a67HQSHT0OXJpW20jWTpj3Lonxd2ZSXt9frQhGuA2qbjF2O');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
